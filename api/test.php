<?php
// Create this as test.php in the same directory as charge.php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

echo json_encode([
    'success' => true,
    'message' => 'PHP endpoint is working!',
    'timestamp' => date('Y-m-d H:i:s')
]);
?>