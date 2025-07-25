<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require __DIR__ . '/../vendor/autoload.php';

\Stripe\Stripe::setApiKey('sk_test_51RX5afGbmcCvmvOdmz75waNsDG0WScLmy8Z3VWHPGlh6FMkmyCiOgUTX7KCkoonjm2niR6gJTg78PFx67YBxnT5100TCBHpTrA');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['amount']) || !isset($input['paymentMethodId'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Lipsesc datele necesare: amount sau paymentMethodId'
    ]);
    exit;
}

try {
    // SOLUTION 2: Add return_url for redirect-based payment methods
    $intent = \Stripe\PaymentIntent::create([
        'amount' => $input['amount'],
        'currency' => 'ron',
        'payment_method' => $input['paymentMethodId'],
        'confirmation_method' => 'manual',
        'confirm' => true,
        // ✅ Provide return URL for redirect-based payments
        'return_url' => 'http://localhost/Consultant-Land-Page/payment-success.html' // Replace with your actual success page
    ]);

    echo json_encode([
        'success' => true,
        'status' => $intent->status,
        'payment_intent_id' => $intent->id
    ]);
    
} catch (\Stripe\Exception\ApiErrorException $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>