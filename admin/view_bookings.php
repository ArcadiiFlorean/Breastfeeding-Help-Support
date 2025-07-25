<?php
// Includem fișierul de configurare pentru baza de date
include_once 'db.php';

// Verificăm dacă utilizatorul este admin
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: admin_login.php');
    exit();
}

// Interogarea pentru a prelua toate rezervările cu detaliile clientului
$sql = "SELECT 
    b.id,
    b.client_id,
    c.name as client_name,
    c.email as client_email,
    c.phone as client_phone,
    b.slot_id,
    b.consult_type,
    b.payment_method,
    b.notes,
    b.booked_at,
    b.name,
    b.date,
    b.hour,
    b.email,
    b.phone
FROM bookings b
LEFT JOIN clients c ON b.client_id = c.id
ORDER BY b.booked_at DESC";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    echo "Eroare la preluarea rezervărilor: " . $e->getMessage();
    exit();
}
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista Rezervări - Admin Dashboard</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
        }
        
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 40px;
            font-size: 2.5em;
            font-weight: 300;
            letter-spacing: -1px;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin-bottom: 40px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 16px;
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%);
            pointer-events: none;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
        }
        
        .stat-card h3 {
            margin: 0;
            font-size: 2.8em;
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .stat-card p {
            margin: 10px 0 0 0;
            font-size: 1.1em;
            opacity: 0.9;
            font-weight: 500;
        }
        
        .search-box {
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
        }
        
        .search-box input {
            padding: 15px 20px;
            width: 400px;
            border: 2px solid #e1e8ed;
            border-radius: 25px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: #f8f9fa;
        }
        
        .search-box input:focus {
            outline: none;
            border-color: #667eea;
            background: white;
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
        }
        
        .table-container {
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            background: white;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
        }
        
        th {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 15px;
            text-align: left;
            font-weight: 600;
            font-size: 0.95em;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            border: none;
        }
        
        td {
            padding: 18px 15px;
            border-bottom: 1px solid #f1f3f4;
            font-size: 0.95em;
            color: #2c3e50;
            vertical-align: middle;
        }
        
        tr {
            transition: all 0.3s ease;
        }
        
        tr:hover {
            background: linear-gradient(90deg, #f8f9ff 0%, #fff 100%);
            transform: scale(1.01);
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }
        
        tr:last-child td {
            border-bottom: none;
        }
        
        .actions {
            display: flex;
            gap: 8px;
            justify-content: center;
        }
        
        .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            text-decoration: none;
            font-size: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .btn-view {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
        }
        
        .btn-view:hover {
            background: linear-gradient(135deg, #2980b9, #1f5582);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
        }
        
        .btn-edit {
            background: linear-gradient(135deg, #2ecc71, #27ae60);
            color: white;
        }
        
        .btn-edit:hover {
            background: linear-gradient(135deg, #27ae60, #1e8449);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(46, 204, 113, 0.4);
        }
        
        .btn-delete {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
        }
        
        .btn-delete:hover {
            background: linear-gradient(135deg, #c0392b, #a93226);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
        }
        
        .no-bookings {
            text-align: center;
            padding: 80px 20px;
            color: #7f8c8d;
        }
        
        .no-bookings h3 {
            font-size: 1.8em;
            margin-bottom: 15px;
            color: #34495e;
        }
        
        .back-link {
            display: inline-flex;
            align-items: center;
            margin-bottom: 30px;
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            padding: 10px 15px;
            border-radius: 25px;
            background: rgba(102, 126, 234, 0.1);
        }
        
        .back-link:hover {
            background: rgba(102, 126, 234, 0.2);
            transform: translateX(-5px);
        }
        
        .back-link::before {
            content: '←';
            margin-right: 8px;
            font-size: 1.2em;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                padding: 20px;
                margin: 10px;
                border-radius: 12px;
            }
            
            .stats {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            
            .search-box input {
                width: 100%;
                max-width: 400px;
            }
            
            table {
                font-size: 0.85em;
            }
            
            th, td {
                padding: 12px 8px;
            }
            
            .actions {
                flex-direction: column;
                gap: 5px;
            }
            
            .btn {
                font-size: 11px;
                padding: 6px 12px;
            }
        }
        
        /* Animații pentru încărcare */
        .container {
            animation: fadeInUp 0.6s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .stat-card {
            animation: slideInLeft 0.6s ease-out;
            animation-fill-mode: both;
        }
        
        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="admin_dashboard.php" class="back-link">Înapoi la Dashboard</a>
        
        <h1>Gestionare Rezervări</h1>
        
        <div class="stats">
            <div class="stat-card">
                <h3><?php echo count($bookings); ?></h3>
                <p>Total Rezervări</p>
            </div>
            <div class="stat-card">
                <h3><?php echo count(array_filter($bookings, function($b) { return $b['date'] == date('Y-m-d'); })); ?></h3>
                <p>Rezervări Astăzi</p>
            </div>
            <div class="stat-card">
                <h3><?php echo count(array_filter($bookings, function($b) { return $b['date'] >= date('Y-m-d'); })); ?></h3>
                <p>Rezervări Viitoare</p>
            </div>
        </div>
        
        <div class="search-box">
            <input type="text" id="searchInput" placeholder="Caută după nume, email sau telefon..." onkeyup="searchBookings()">
        </div>
        
        <?php if (empty($bookings)): ?>
            <div class="no-bookings">
                <h3>Nu există rezervări în sistem</h3>
                <p>Când clienții vor face rezervări, acestea vor apărea aici.</p>
            </div>
        <?php else: ?>
            <div class="table-container">
                <table id="bookingsTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Client</th>
                            <th>Email</th>
                            <th>Telefon</th>
                            <th>Data</th>
                            <th>Ora</th>
                            <th>Tip Consultație</th>
                            <th>Metoda Plată</th>
                            <th>Rezervat la</th>
                            <th>Acțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($bookings as $booking): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($booking['id']); ?></td>
                            <td>
                                <?php 
                                // Afișăm numele din tabela bookings sau din clients
                                $client_name = !empty($booking['name']) ? $booking['name'] : $booking['client_name'];
                                echo htmlspecialchars($client_name ?: 'N/A'); 
                                ?>
                            </td>
                            <td>
                                <?php 
                                // Afișăm email-ul din tabela bookings sau din clients
                                $email = !empty($booking['email']) ? $booking['email'] : $booking['client_email'];
                                echo htmlspecialchars($email ?: 'N/A'); 
                                ?>
                            </td>
                            <td>
                                <?php 
                                // Afișăm telefonul din tabela bookings sau din clients
                                $phone = !empty($booking['phone']) ? $booking['phone'] : $booking['client_phone'];
                                echo htmlspecialchars($phone ?: 'N/A'); 
                                ?>
                            </td>
                            <td><?php echo htmlspecialchars($booking['date'] ?: 'N/A'); ?></td>
                            <td><?php echo htmlspecialchars($booking['hour'] ?: 'N/A'); ?></td>
                            <td><?php echo htmlspecialchars($booking['consult_type'] ?: 'N/A'); ?></td>
                            <td><?php echo htmlspecialchars($booking['payment_method'] ?: 'N/A'); ?></td>
                            <td><?php echo date('d.m.Y H:i', strtotime($booking['booked_at'])); ?></td>
                            <td class="actions">
                                <a href="view_booking.php?id=<?php echo $booking['id']; ?>" class="btn btn-view">Vezi</a>
                                <a href="edit_booking.php?id=<?php echo $booking['id']; ?>" class="btn btn-edit">Editează</a>
                                <a href="delete_booking.php?id=<?php echo $booking['id']; ?>" class="btn btn-delete" onclick="return confirm('Ești sigur că vrei să ștergi această rezervare?')">Șterge</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
    </div>

    <script>
        function searchBookings() {
            const input = document.getElementById('searchInput');
            const filter = input.value.toLowerCase();
            const table = document.getElementById('bookingsTable');
            const rows = table.getElementsByTagName('tr');

            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].getElementsByTagName('td');
                let found = false;
                
                // Căutăm în coloanele: nume (1), email (2), telefon (3)
                for (let j = 1; j <= 3; j++) {
                    if (cells[j] && cells[j].textContent.toLowerCase().indexOf(filter) > -1) {
                        found = true;
                        break;
                    }
                }
                
                rows[i].style.display = found ? '' : 'none';
            }
        }
    </script>
</body>
</html>