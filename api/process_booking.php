<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);
$name = $data["name"];
$email = $data["email"];
$date = $data["date"];
$package = $data["package"];

$stmt = $conn->prepare("INSERT INTO bookings (name, email, date, package) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $date, $package);
$stmt->execute();
echo json_encode(["status" => "success"]);
?>
