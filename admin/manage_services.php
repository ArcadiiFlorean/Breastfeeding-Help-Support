<?php 
session_start(); 
if (!isset($_SESSION['admin_logged_in'])) {     
    header("Location: admin_login.php");     
    exit; 
} 
include 'db.php';  

if ($_SERVER["REQUEST_METHOD"] === "POST") {     
    if (isset($_POST['action']) && $_POST['action'] === 'update') {
        // Actualizare serviciu existent
        $stmt = $pdo->prepare("UPDATE services SET name=?, price=?, description=? WHERE id=?");     
        $stmt->execute([$_POST['name'], $_POST['price'], $_POST['description'], $_POST['id']]);
        $message = "Serviciul a fost actualizat cu succes!";
    } elseif (isset($_POST['action']) && $_POST['action'] === 'add') {
        // Adăugare serviciu nou
        $stmt = $pdo->prepare("INSERT INTO services (name, price, description) VALUES (?, ?, ?)");
        $stmt->execute([$_POST['name'], $_POST['price'], $_POST['description']]);
        $message = "Serviciul a fost adăugat cu succes!";
    } elseif (isset($_POST['action']) && $_POST['action'] === 'delete') {
        // Ștergere serviciu
        $stmt = $pdo->prepare("DELETE FROM services WHERE id=?");
        $stmt->execute([$_POST['id']]);
        $message = "Serviciul a fost șters cu succes!";
    }
}  

$services = $pdo->query("SELECT * FROM services ORDER BY id ASC")->fetchAll(); 
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editează Servicii</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
        .service-form { background: #f9f9f9; padding: 15px; margin-bottom: 20px; border-radius: 5px; border: 1px solid #ddd; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; color: #333; }
        input, textarea { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
        textarea { height: 80px; resize: vertical; }
        button { padding: 10px 15px; margin: 5px; border: none; border-radius: 4px; cursor: pointer; }
        .btn-save { background-color: #4CAF50; color: white; }
        .btn-delete { background-color: #f44336; color: white; }
        .btn-add { background-color: #2196F3; color: white; }
        .message { padding: 10px; margin: 10px 0; border-radius: 4px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .back-link { display: inline-block; margin-top: 20px; color: #007bff; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
        h2 { color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; }
        h3 { color: #666; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Gestionare Servicii</h2>
        
        <?php if (isset($message)): ?>
            <div class="message"><?= htmlspecialchars($message) ?></div>
        <?php endif; ?>

        <h3>Adaugă Serviciu Nou</h3>
        <form method="POST" class="service-form">
            <input type="hidden" name="action" value="add">
            <div class="form-group">
                <label for="new_name">Nume serviciu:</label>
                <input type="text" id="new_name" name="name" required>
            </div>
            <div class="form-group">
                <label for="new_price">Preț:</label>
                <input type="text" id="new_price" name="price" placeholder="ex: $75 sau Starting at $60" required>
            </div>
            <div class="form-group">
                <label for="new_description">Descriere:</label>
                <textarea id="new_description" name="description" placeholder="Descrierea detaliată a serviciului..."></textarea>
            </div>
            <button type="submit" class="btn-add">Adaugă Serviciu</button>
        </form>

        <h3>Servicii Existente</h3>
        <?php foreach ($services as $s): ?> 
        <form method="POST" class="service-form">
            <input type="hidden" name="action" value="update">
            <input type="hidden" name="id" value="<?= $s['id'] ?>">
            
            <div class="form-group">
                <label for="name_<?= $s['id'] ?>">Nume serviciu:</label>
                <input type="text" id="name_<?= $s['id'] ?>" name="name" value="<?= htmlspecialchars($s['name']) ?>" required>
            </div>
            
            <div class="form-group">
                <label for="price_<?= $s['id'] ?>">Preț:</label>
                <input type="text" id="price_<?= $s['id'] ?>" name="price" value="<?= htmlspecialchars($s['price']) ?>" required>
            </div>
            
            <div class="form-group">
                <label for="desc_<?= $s['id'] ?>">Descriere:</label>
                <textarea id="desc_<?= $s['id'] ?>" name="description"><?= htmlspecialchars($s['description'] ?? '') ?></textarea>
            </div>
            
            <button type="submit" class="btn-save">Salvează Modificările</button>
            
            <button type="submit" name="action" value="delete" class="btn-delete" 
                    onclick="return confirm('Ești sigur că vrei să ștergi acest serviciu?')">
                Șterge Serviciu
            </button>
        </form> 
        <?php endforeach; ?>

        <?php if (empty($services)): ?>
            <p>Nu există servicii în baza de date.</p>
        <?php endif; ?>

        <a href="admin_dashboard.php" class="back-link">← Înapoi la Dashboard</a>
    </div>
</body>
</html>