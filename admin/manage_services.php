<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: admin_login.php");
    exit;
}
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $stmt = $pdo->prepare("UPDATE services SET name=?, price=? WHERE id=?");
    $stmt->execute([$_POST['name'], $_POST['price'], $_POST['id']]);
}

$services = $pdo->query("SELECT * FROM services")->fetchAll();
?>

<h2>Editează Servicii</h2>
<?php foreach ($services as $s): ?>
<form method="POST" style="margin-bottom:20px;">
  <input type="hidden" name="id" value="<?= $s['id'] ?>">
  <input type="text" name="name" value="<?= htmlspecialchars($s['name']) ?>" required>
  <input type="text" name="price" value="<?= htmlspecialchars($s['price']) ?>" required>
  <button type="submit">Salvează</button>
</form>
<?php endforeach; ?>
<a href="admin_dashboard.php">← Înapoi</a>
