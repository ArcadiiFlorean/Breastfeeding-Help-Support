<?php
require __DIR__ . '/../vendor/autoload.php';


\Stripe\Stripe::setApiKey('sk_test_51RX5afGbmcCvmvOdmz75waNsDG0WScLmy8Z3VWHPGlh6FMkmyCiOgUTX7KCkoonjm2niR6gJTg78PFx67YBxnT5100TCBHpTrA');

header('Content-Type: application/json');

// Preluăm datele trimise din frontend
$input = json_decode(file_get_contents('php://input'), true);

try {
    // Creăm un PaymentIntent și îl confirmăm imediat
    $intent = \Stripe\PaymentIntent::create([
        'amount' => $input['amount'],
        'currency' => 'ron',
        'payment_method' => $input['paymentMethodId'],
        'confirmation_method' => 'manual',
        'confirm' => true,
    ]);

    // Returnăm succesul și statusul
    echo json_encode([
        'success' => true,
        'status' => $intent->status
    ]);
} catch (\Stripe\Exception\ApiErrorException $e) {
    // Returnăm eroarea
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
