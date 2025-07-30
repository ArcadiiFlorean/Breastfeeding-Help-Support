<?php
session_start();

// Verifică autentificarea admin
if (!isset($_SESSION['admin_logged_in'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Acces neautorizat']);
    exit;
}

// Include conexiunea la baza de date
include 'db.php';

// Setează header JSON
header('Content-Type: application/json');

// Directorul unde se salvează documentele
$uploadDir = 'uploads/documents/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

try {
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            handleGetRequest();
            break;

        case 'POST':
            handlePostRequest();
            break;

        case 'DELETE':
            handleDeleteRequest();
            break;

        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'error' => 'Metodă nepermisă']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Eroare server: ' . $e->getMessage()]);
}


// =================== FUNCȚII =================== //

function handleGetRequest() {
    global $pdo;

    if (isset($_GET['download']) && isset($_GET['id'])) {
        downloadDocument($_GET['id']);
        return;
    }

    try {
        $stmt = $pdo->prepare("
            SELECT 
                id, title, description, category, original_filename, file_path, 
                file_type, file_size, is_featured, price, is_free, downloads_count, 
                status, created_at,
                DATE_FORMAT(created_at, '%d.%m.%Y la %H:%i') as created_at_formatted
            FROM documents 
            WHERE status = 'active' 
            ORDER BY is_featured DESC, created_at DESC
        ");
        $stmt->execute();
        $documents = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($documents as &$doc) {
            $doc['formatted_size'] = formatFileSize($doc['file_size']);
            $doc['is_featured'] = (bool)$doc['is_featured'];
            $doc['is_free'] = (bool)$doc['is_free'];
        }

        echo json_encode(['success' => true, 'data' => $documents]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Eroare la încărcarea documentelor: ' . $e->getMessage()]);
    }
}

function handlePostRequest() {
    global $pdo, $uploadDir;

    if (!isset($_FILES['document']) || $_FILES['document']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['success' => false, 'error' => 'Fișierul nu a fost încărcat corect.']);
        return;
    }

    $file = $_FILES['document'];
    $title = trim($_POST['title'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $category = $_POST['category'] ?? 'general';
    $isFeatured = isset($_POST['is_featured']) ? 1 : 0;
    $price = floatval($_POST['price'] ?? 0);
    $isFree = isset($_POST['is_free']) && $_POST['is_free'] === '1' ? 1 : 0;
    $previewAvailable = 0;

    if (empty($title)) {
        echo json_encode(['success' => false, 'error' => 'Titlul este obligatoriu']);
        return;
    }

    if ($file['size'] > 10 * 1024 * 1024) {
        echo json_encode(['success' => false, 'error' => 'Fișierul depășește limita de 10MB.']);
        return;
    }

    $allowedTypes = [
        'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'
    ];

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    if (!in_array($mimeType, $allowedTypes)) {
        echo json_encode(['success' => false, 'error' => 'Tipul de fișier nu este permis.']);
        return;
    }

    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $uniqueName = uniqid('doc_') . '.' . $extension;
    $filePath = $uploadDir . $uniqueName;

    if (!move_uploaded_file($file['tmp_name'], $filePath)) {
        echo json_encode(['success' => false, 'error' => 'Eroare la salvarea fișierului.']);
        return;
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO documents (
                title, description, category, original_filename, file_path, 
                file_type, file_size, is_featured, price, is_free, 
                preview_available, status, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', NOW())
        ");
        $stmt->execute([
            $title, $description, $category, $file['name'], $filePath,
            $mimeType, $file['size'], $isFeatured, $price, $isFree, $previewAvailable
        ]);

        echo json_encode(['success' => true, 'message' => 'Document salvat cu succes.']);
    } catch (PDOException $e) {
        @unlink($filePath);
        echo json_encode(['success' => false, 'error' => 'Eroare DB: ' . $e->getMessage()]);
    }
}

function handleDeleteRequest() {
    global $pdo;

    $id = $_GET['id'] ?? null;

    if (!$id || !is_numeric($id)) {
        echo json_encode(['success' => false, 'error' => 'ID invalid']);
        return;
    }

    try {
        $stmt = $pdo->prepare("SELECT file_path FROM documents WHERE id = ? AND status = 'active'");
        $stmt->execute([$id]);
        $document = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$document) {
            echo json_encode(['success' => false, 'error' => 'Documentul nu a fost găsit']);
            return;
        }

        $pdo->prepare("UPDATE documents SET status = 'deleted', deleted_at = NOW() WHERE id = ?")->execute([$id]);

        if (file_exists($document['file_path'])) {
            @unlink($document['file_path']);
        }

        echo json_encode(['success' => true, 'message' => 'Document șters cu succes']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Eroare la ștergere: ' . $e->getMessage()]);
    }
}

function downloadDocument($id) {
    global $pdo;

    if (!$id || !is_numeric($id)) {
        http_response_code(404);
        echo "Document inexistent";
        return;
    }

    try {
        $stmt = $pdo->prepare("SELECT original_filename, file_path, file_type FROM documents WHERE id = ? AND status = 'active'");
        $stmt->execute([$id]);
        $document = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$document || !file_exists($document['file_path'])) {
            http_response_code(404);
            echo "Fișier lipsă";
            return;
        }

        $pdo->prepare("UPDATE documents SET downloads_count = downloads_count + 1 WHERE id = ?")->execute([$id]);

        header('Content-Type: ' . $document['file_type']);
        header('Content-Disposition: attachment; filename="' . $document['original_filename'] . '"');
        header('Content-Length: ' . filesize($document['file_path']));
        header('Cache-Control: no-cache, must-revalidate');

        readfile($document['file_path']);
        exit;
    } catch (PDOException $e) {
        http_response_code(500);
        echo "Eroare la descărcare";
    }
}

function formatFileSize($bytes) {
    if ($bytes >= 1073741824) {
        return number_format($bytes / 1073741824, 2) . ' GB';
    } elseif ($bytes >= 1048576) {
        return number_format($bytes / 1048576, 2) . ' MB';
    } elseif ($bytes >= 1024) {
        return number_format($bytes / 1024, 2) . ' KB';
    } else {
        return $bytes . ' bytes';
    }
}
?>
