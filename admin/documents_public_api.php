<?php
// API public pentru documente - nu necesită autentificare admin
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Includem conexiunea la baza de date
include 'db.php';

try {
    $method = $_SERVER['REQUEST_METHOD'];
    
    if ($method === 'GET') {
        // Verifică dacă este o cerere de descărcare
        if (isset($_GET['download']) && isset($_GET['id'])) {
            downloadDocument($_GET['id']);
            return;
        }
        
        // Returnează lista de documente publice
        $stmt = $pdo->prepare("
            SELECT 
                id, 
                title, 
                description, 
                category, 
                original_filename, 
                file_type, 
                file_size, 
                is_featured, 
                downloads_count,
                DATE_FORMAT(created_at, '%d.%m.%Y') as created_at_formatted
            FROM documents 
            WHERE status = 'active' 
            ORDER BY is_featured DESC, created_at DESC
        ");
        
        $stmt->execute();
        $documents = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Formatează dimensiunea fișierului
        foreach ($documents as &$doc) {
            $doc['formatted_size'] = formatFileSize($doc['file_size']);
            $doc['is_featured'] = (bool)$doc['is_featured'];
            $doc['icon'] = getDocumentIcon($doc['file_type']);
        }
        
        echo json_encode(['success' => true, 'data' => $documents]);
        
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Metodă nepermisă']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Eroare server: ' . $e->getMessage()]);
}

function downloadDocument($id) {
    global $pdo;
    
    if (!$id || !is_numeric($id)) {
        http_response_code(404);
        echo "Document nu a fost găsit";
        return;
    }
    
    try {
        $stmt = $pdo->prepare("
            SELECT original_filename, file_path, file_type 
            FROM documents 
            WHERE id = ? AND status = 'active'
        ");
        $stmt->execute([$id]);
        $document = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$document || !file_exists($document['file_path'])) {
            http_response_code(404);
            echo "Document nu a fost găsit";
            return;
        }
        
        // Incrementează contorul de descărcări
        $updateStmt = $pdo->prepare("UPDATE documents SET downloads_count = downloads_count + 1 WHERE id = ?");
        $updateStmt->execute([$id]);
        
        // Setează header-urile pentru descărcare
        header('Content-Type: ' . $document['file_type']);
        header('Content-Disposition: attachment; filename="' . $document['original_filename'] . '"');
        header('Content-Length: ' . filesize($document['file_path']));
        header('Cache-Control: no-cache, must-revalidate');
        
        // Trimite fișierul
        readfile($document['file_path']);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo "Eroare la descărcarea documentului";
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

function getDocumentIcon($fileType) {
    if (strpos($fileType, 'pdf') !== false) return '📄';
    if (strpos($fileType, 'word') !== false || strpos($fileType, 'document') !== false) return '📝';
    if (strpos($fileType, 'excel') !== false || strpos($fileType, 'sheet') !== false) return '📊';
    if (strpos($fileType, 'image') !== false) return '🖼️';
    return '📋';
}
?>