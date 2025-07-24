<?php
// api/services.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ✅ Configurare bază de date - adaptată pentru structura ta
$host = 'localhost';
$dbname = 'breastfeeding_consulting';  // ← Numele bazei tale de date
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false, 
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            if (isset($_GET['id'])) {
                // Un singur serviciu
                $stmt = $pdo->prepare("SELECT * FROM services WHERE id = ?");
                $stmt->execute([$_GET['id']]);
                $service = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($service) {
                    // Adaugă valori default pentru coloanele care pot lipsi
                    $service['description'] = $service['description'] ?? 'Descriere serviciu';
                    $service['duration'] = $service['duration'] ?? 60;
                    $service['currency'] = $service['currency'] ?? 'RON';
                    $service['is_active'] = $service['is_active'] ?? 1;
                    
                    echo json_encode(['success' => true, 'data' => $service]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Service not found']);
                }
            } else {
                // Toate serviciile
                $stmt = $pdo->prepare("SELECT * FROM services ORDER BY id ASC");
                $stmt->execute();
                $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                // Adaugă valori default pentru serviciile existente
                foreach ($services as &$service) {
                    $service['description'] = $service['description'] ?? 'Descriere serviciu';
                    $service['duration'] = $service['duration'] ?? 60;
                    $service['currency'] = $service['currency'] ?? 'RON';
                    $service['is_active'] = $service['is_active'] ?? 1;
                }
                
                echo json_encode(['success' => true, 'data' => $services]);
            }
        } catch (PDOException $e) {
            echo json_encode([
                'success' => false, 
                'message' => 'Database error: ' . $e->getMessage()
            ]);
        }
        break;
        
    case 'POST':
        try {
            // Adaugă serviciu nou
            $input = json_decode(file_get_contents('php://input'), true);
            
            $required_fields = ['name', 'price'];
            foreach ($required_fields as $field) {
                if (!isset($input[$field]) || empty($input[$field])) {
                    echo json_encode(['success' => false, 'message' => "Field $field is required"]);
                    exit;
                }
            }
            
            // Verifică dacă coloanele noi există în tabelă
            $stmt = $pdo->prepare("SHOW COLUMNS FROM services LIKE 'description'");
            $stmt->execute();
            $hasDescription = $stmt->rowCount() > 0;
            
            if ($hasDescription) {
                // Folosește toate coloanele
                $stmt = $pdo->prepare("INSERT INTO services (name, description, price, duration, currency, is_active) VALUES (?, ?, ?, ?, ?, ?)");
                $result = $stmt->execute([
                    $input['name'],
                    $input['description'] ?? 'Descriere serviciu',
                    $input['price'],
                    $input['duration'] ?? 60,
                    $input['currency'] ?? 'RON',
                    $input['is_active'] ?? 1
                ]);
            } else {
                // Folosește doar coloanele existente
                $stmt = $pdo->prepare("INSERT INTO services (name, price) VALUES (?, ?)");
                $result = $stmt->execute([
                    $input['name'],
                    $input['price']
                ]);
            }
            
            if ($result) {
                echo json_encode(['success' => true, 'message' => 'Service created successfully', 'id' => $pdo->lastInsertId()]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to create service']);
            }
        } catch (PDOException $e) {
            echo json_encode([
                'success' => false, 
                'message' => 'Database error: ' . $e->getMessage()
            ]);
        }
        break;
        
    case 'PUT':
        try {
            // Actualizează serviciu
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($input['id'])) {
                echo json_encode(['success' => false, 'message' => 'Service ID is required']);
                exit;
            }
            
            $fields_to_update = [];
            $values = [];
            
            // Verifică ce coloane există
            $stmt = $pdo->prepare("SHOW COLUMNS FROM services");
            $stmt->execute();
            $existing_columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
            
            $allowed_fields = ['name', 'description', 'price', 'duration', 'currency', 'is_active'];
            foreach ($allowed_fields as $field) {
                if (isset($input[$field]) && in_array($field, $existing_columns)) {
                    $fields_to_update[] = "$field = ?";
                    $values[] = $input[$field];
                }
            }
            
            if (empty($fields_to_update)) {
                echo json_encode(['success' => false, 'message' => 'No valid fields to update']);
                exit;
            }
            
            $values[] = $input['id'];
            $sql = "UPDATE services SET " . implode(', ', $fields_to_update) . " WHERE id = ?";
            
            $stmt = $pdo->prepare($sql);
            $result = $stmt->execute($values);
            
            if ($result) {
                echo json_encode(['success' => true, 'message' => 'Service updated successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to update service']);
            }
        } catch (PDOException $e) {
            echo json_encode([
                'success' => false, 
                'message' => 'Database error: ' . $e->getMessage()
            ]);
        }
        break;
        
    case 'DELETE':
        try {
            // Șterge serviciu
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($input['id'])) {
                echo json_encode(['success' => false, 'message' => 'Service ID is required']);
                exit;
            }
            
            // Verifică dacă există coloana is_active pentru soft delete
            $stmt = $pdo->prepare("SHOW COLUMNS FROM services LIKE 'is_active'");
            $stmt->execute();
            
            if ($stmt->rowCount() > 0) {
                // Soft delete
                $stmt = $pdo->prepare("UPDATE services SET is_active = 0 WHERE id = ?");
            } else {
                // Hard delete
                $stmt = $pdo->prepare("DELETE FROM services WHERE id = ?");
            }
            
            $result = $stmt->execute([$input['id']]);
            
            if ($result) {
                echo json_encode(['success' => true, 'message' => 'Service deleted successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to delete service']);
            }
        } catch (PDOException $e) {
            echo json_encode([
                'success' => false, 
                'message' => 'Database error: ' . $e->getMessage()
            ]);
        }
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
?>