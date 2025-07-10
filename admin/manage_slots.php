<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: admin_login.php");
    exit;
}

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['slots'])) {
    $pdo->exec("DELETE FROM available_slots");

    foreach ($_POST['slots'] as $slot) {
        list($date, $time) = explode('|', $slot);
        $stmt = $pdo->prepare("INSERT INTO available_slots (slot_date, slot_time) VALUES (?, ?)");
        $stmt->execute([$date, $time]);
    }

    $message = "✅ Program actualizat cu succes!";
}

$existingSlots = $pdo->query("SELECT CONCAT(slot_date, '|', slot_time) as slot FROM available_slots")->fetchAll(PDO::FETCH_COLUMN);
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <title>Admin - Gestionează Sloturi</title>
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', sans-serif;
            background: #f4f6f9;
            margin: 0;
            padding: 40px 20px;
            color: #333;
        }
        h2 {
            font-size: 24px;
            color: #222;
            text-align: center;
        }
        .message {
            background-color: #dff0d8;
            color: #3c763d;
            padding: 12px;
            border-radius: 6px;
            margin: 20px auto;
            max-width: 600px;
            text-align: center;
            font-weight: bold;
        }
        form {
            max-width: 1000px;
            margin: auto;
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        input[type="checkbox"] {
            display: none;
        }
        label {
            display: block;
            padding: 12px;
            background: #f1f1f1;
            border-radius: 8px;
            border: 1px solid #ccc;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
        }
        input[type="checkbox"]:checked + label {
            background-color: #cb8645;
            color: white;
            border-color: #cb8645;
            font-weight: bold;
        }
        button {
            background-color: #cb8645;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #a25b2a;
        }
        .back-link {
            display: block;
            text-align: center;
            margin-top: 30px;
            text-decoration: none;
            color: #cb8645;
            font-weight: bold;
        }
        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

<h2>🕒 Selectează zilele și orele disponibile</h2>

<?php if (isset($message)) echo "<div class='message'>$message</div>"; ?>

<form method="POST">
    <div class="grid">
        <?php
        $startDate = new DateTime();
        for ($d = 0; $d < 7; $d++) {
            $date = $startDate->format('Y-m-d');
            for ($h = 9; $h <= 17; $h++) {
                $slotKey = $date . '|' . sprintf('%02d:00:00', $h);
                $checked = in_array($slotKey, $existingSlots) ? 'checked' : '';
                echo "<div>
                        <input type='checkbox' name='slots[]' id='$slotKey' value='$slotKey' $checked>
                        <label for='$slotKey'>" . $date . "<br>" . sprintf('%02d:00', $h) . "</label>
                      </div>";
            }
            $startDate->modify('+1 day');
        }
        ?>
    </div>
    <div style="text-align: center;">
        <button type="submit">💾 Salvează programul</button>
    </div>
</form>

<a class="back-link" href="admin_dashboard.php">← Înapoi la Dashboard</a>

</body>
</html>
