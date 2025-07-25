<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: admin_login.php");
    exit;
}

// Includem conexiunea la baza de date
include 'db.php';

// Calculează statistici reale din baza de date
try {
    // Total rezervări active (viitoare)
    $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM bookings WHERE date >= CURDATE()");
    $stmt->execute();
    $rezervari_active = $stmt->fetch()['total'];
    
    // Clienți noi (din ultima lună)
    $stmt = $pdo->prepare("SELECT COUNT(DISTINCT client_id) as total FROM bookings WHERE booked_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)");
    $stmt->execute();
    $clienti_noi = $stmt->fetch()['total'];
    
    // Calculează satisfacția (exemplu: rezervări confirmate vs totale)
    $stmt = $pdo->prepare("SELECT 
        (COUNT(CASE WHEN payment_method IS NOT NULL THEN 1 END) * 100.0 / COUNT(*)) as satisfactie 
        FROM bookings WHERE date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)");
    $stmt->execute();
    $satisfactie = round($stmt->fetch()['satisfactie'] ?? 95);
    
} catch (PDOException $e) {
    // Valori default în caz de eroare
    $rezervari_active = 0;
    $clienti_noi = 0;
    $satisfactie = 95;
}
?>


<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Consultant Alăptare</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        .dashboard-container {
            min-height: 100vh;
            padding: 40px 20px;
            animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .header {
            text-align: center;
            margin-bottom: 50px;
            color: white;
        }
        
        .header h1 {
            font-size: 3rem;
            font-weight: 700;
            text-shadow: 0 4px 20px rgba(0,0,0,0.3);
            margin-bottom: 15px;
            letter-spacing: -1px;
        }
        
        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
            font-weight: 300;
        }
        
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .dashboard-card {
            background: white;
            border-radius: 25px;
            padding: 40px 30px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        
        .dashboard-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(102, 126, 234, 0.05) 0%, transparent 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .dashboard-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 30px 80px rgba(0,0,0,0.25);
            text-decoration: none;
            color: inherit;
        }
        
        .dashboard-card:hover::before {
            opacity: 1;
        }
        
        .card-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 25px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            margin-bottom: 25px;
            transition: all 0.3s ease;
        }
        
        .dashboard-card:hover .card-icon {
            transform: scale(1.1);
        }
        
        .card-services .card-icon {
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            color: white;
        }
        
        .card-slots .card-icon {
            background: linear-gradient(135deg, #4ecdc4, #26d0ce);
            color: white;
        }
        
        .card-bookings .card-icon {
            background: linear-gradient(135deg, #45b7d1, #2980b9);
            color: white;
        }
        
        .card-logout .card-icon {
            background: linear-gradient(135deg, #96ceb4, #85c1a3);
            color: white;
        }
        
        .card-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 15px;
            letter-spacing: -0.5px;
        }
        
        .card-description {
            color: #7f8c8d;
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        
        .card-action {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 25px;
            border-radius: 25px;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .card-services .card-action {
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            color: white;
        }
        
        .card-slots .card-action {
            background: linear-gradient(135deg, #4ecdc4, #26d0ce);
            color: white;
        }
        
        .card-bookings .card-action {
            background: linear-gradient(135deg, #45b7d1, #2980b9);
            color: white;
        }
        
        .card-logout .card-action {
            background: linear-gradient(135deg, #96ceb4, #85c1a3);
            color: white;
        }
        
        .dashboard-card:hover .card-action {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }
        
        .stats-bar {
            background: rgba(255,255,255,0.15);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 40px;
            display: flex;
            justify-content: space-around;
            text-align: center;
            color: white;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .stat-item h3 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 5px;
            text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        
        .stat-item p {
            font-size: 0.9rem;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .logout-section {
            text-align: center;
            margin-top: 50px;
        }
        
        .logout-btn {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 25px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }
        
        .logout-btn:hover {
            background: linear-gradient(135deg, #c0392b, #a93226);
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(231, 76, 60, 0.4);
            color: white;
            text-decoration: none;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .dashboard-container {
                padding: 20px 15px;
            }
            
            .header h1 {
                font-size: 2.2rem;
            }
            
            .dashboard-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .dashboard-card {
                padding: 30px 20px;
            }
            
            .stats-bar {
                flex-direction: column;
                gap: 20px;
                padding: 20px;
            }
            
            .card-icon {
                width: 60px;
                height: 60px;
                font-size: 2rem;
            }
        }
        
        /* Animații pentru carduri */
        .dashboard-card {
            animation: slideInUp 0.6s ease-out;
            animation-fill-mode: both;
        }
        
        .dashboard-card:nth-child(1) { animation-delay: 0.1s; }
        .dashboard-card:nth-child(2) { animation-delay: 0.2s; }
        .dashboard-card:nth-child(3) { animation-delay: 0.3s; }
        .dashboard-card:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Efecte pentru stats bar */
        .stats-bar {
            animation: fadeIn 1s ease-out 0.5s both;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Particule decorative */
        .bg-decoration {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        
        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }
        
        .particle:nth-child(1) { top: 20%; left: 20%; animation-delay: 0s; }
        .particle:nth-child(2) { top: 60%; left: 80%; animation-delay: 2s; }
        .particle:nth-child(3) { top: 80%; left: 40%; animation-delay: 4s; }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
    </style>
</head>
<body>
    <div class="bg-decoration">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
    </div>

    <div class="dashboard-container">
        <div class="header">
            <h1>🏥 Admin Dashboard</h1>
            <p>Panoul de administrare pentru consultanța în alăptare</p>
        </div>

     <div class="stats-bar">
    <div class="stat-item">
        <h3><?php echo $rezervari_active; ?></h3>
        <p>Rezervări active</p>
    </div>
    <div class="stat-item">
        <h3><?php echo $clienti_noi; ?></h3>
        <p>Clienți noi</p>
    </div>
    <div class="stat-item">
        <h3><?php echo $satisfactie; ?>%</h3>
        <p>Satisfacție</p>
    </div>
</div>

        <div class="dashboard-grid">
            <a href="manage_services.php" class="dashboard-card card-services">
                <div class="card-icon">💼</div>
                <h3 class="card-title">Gestionare Servicii</h3>
                <p class="card-description">Editează serviciile oferite, prețurile și descrierile pentru consultații</p>
                <div class="card-action">
                    ✏️ Editează servicii
                </div>
            </a>

            <a href="manage_slots.php" class="dashboard-card card-slots">
                <div class="card-icon">⏰</div>
                <h3 class="card-title">Programare Ore</h3>
                <p class="card-description">Setează și gestionează orele disponibile pentru programări</p>
                <div class="card-action">
                    🕒 Setează orele
                </div>
            </a>

            <a href="view_bookings.php" class="dashboard-card card-bookings">
                <div class="card-icon">📋</div>
                <h3 class="card-title">Rezervări</h3>
                <p class="card-description">Vizualizează, editează și gestionează toate rezervările clienților</p>
                <div class="card-action">
                    👁️ Vezi rezervări
                </div>
            </a>

            <a href="logout.php" class="dashboard-card card-logout">
                <div class="card-icon">🚪</div>
                <h3 class="card-title">Deconectare</h3>
                <p class="card-description">Închide sesiunea și ieși din panoul de administrare în siguranță</p>
                <div class="card-action">
                    🔓 Logout
                </div>
            </a>
        </div>
    </div>

    <script>
        // Efecte interactive pentru dashboard
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.dashboard-card');
            
            cards.forEach((card, index) => {
                card.addEventListener('mouseenter', function() {
                    // Efect paralax ușor
                    this.style.transform = 'translateY(-10px) scale(1.02) rotateZ(1deg)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1) rotateZ(0deg)';
                });
                
                // Click effect
                card.addEventListener('mousedown', function() {
                    this.style.transform = 'translateY(-5px) scale(0.98)';
                });
                
                card.addEventListener('mouseup', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                });
            });
            
            // Animație pentru statistici
            const statNumbers = document.querySelectorAll('.stat-item h3');
            statNumbers.forEach(stat => {
                const finalNumber = parseInt(stat.textContent);
                let currentNumber = 0;
                const increment = finalNumber / 30;
                
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        stat.textContent = finalNumber + (stat.textContent.includes('%') ? '%' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(currentNumber) + (stat.textContent.includes('%') ? '%' : '');
                    }
                }, 50);
            });
        });
    </script>
</body>
</html>