<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: admin_login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <title>Admin Dashboard</title>
</head>
<body style="font-family: Arial; background: #fff8f4; padding: 40px;">
  <h1>Bun venit în panoul de administrare</h1>
  <ul style="list-style:none; padding:0;">
    <li><a href="manage_services.php">✔️ Editează servicii și prețuri</a></li>
    <li><a href="manage_hours.php">🕒 Setează ore disponibile</a></li>
    <li><a href="logout.php" style="color:red;">Logout</a></li>
  </ul>
</body>
</html>
