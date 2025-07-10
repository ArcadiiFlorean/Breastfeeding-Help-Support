<?php
include 'db.php';

$date = $_POST['date'];  // din select
$hour = $_POST['hour'];  // din select

// verificăm dacă slotul e liber
$check = $pdo->prepare("SELECT * FROM available_slots WHERE date = ? AND hour = ? AND status = 'available'");
$check->execute([$date, $hour]);

if ($check->rowCount() === 0) {
  die("Slotul selectat nu mai este disponibil. Vă rugăm alegeți altul.");
}

// salvăm programarea
$stmt = $pdo->prepare("INSERT INTO appointments (name, email, phone, consult_type, date, hour, payment_method, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->execute([
  $_POST['name'],
  $_POST['email'],
  $_POST['phone'],
  $_POST['consult_type'],
  $date,
  $hour,
  $_POST['payment_method'],
  $_POST['notes']
]);

// marcăm slotul ca "booked"
$update = $pdo->prepare("UPDATE available_slots SET status = 'booked' WHERE date = ? AND hour = ?");
$update->execute([$date, $hour]);

// redirecționezi sau confirmi
header("Location: /thankyou");
exit;
