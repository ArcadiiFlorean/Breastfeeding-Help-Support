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
    <title>Gestionare Servicii - Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px 0;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
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
        
        .main-card {
            background: white;
            border-radius: 25px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
            overflow: hidden;
            backdrop-filter: blur(10px);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%);
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 4px 20px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
            margin: 0;
        }
        
        .content {
            padding: 40px;
        }
        
        .message {
            background: linear-gradient(135deg, #2ecc71, #27ae60);
            color: white;
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 30px;
            box-shadow: 0 8px 25px rgba(46, 204, 113, 0.3);
            border: none;
            font-weight: 600;
            text-align: center;
            animation: slideInDown 0.5s ease-out;
        }
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .section-title {
            color: #2c3e50;
            font-weight: 700;
            font-size: 1.5rem;
            margin: 40px 0 25px 0;
            display: flex;
            align-items: center;
            gap: 10px;
            position: relative;
        }
        
        .section-title::after {
            content: '';
            flex: 1;
            height: 3px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 2px;
            margin-left: 20px;
        }
        
        .service-form {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: none;
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .service-form::before {
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
        
        .service-form:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.12);
        }
        
        .service-form:hover::before {
            opacity: 1;
        }
        
        .add-form {
            border-left: 5px solid #2ecc71;
        }
        
        .edit-form {
            border-left: 5px solid #f39c12;
        }
        
        .form-group {
            margin-bottom: 25px;
            position: relative;
        }
        
        .form-label {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 8px;
            font-size: 0.95em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .form-control {
            border: 2px solid #e1e8ed;
            border-radius: 12px;
            padding: 15px 20px;
            font-size: 1em;
            transition: all 0.3s ease;
            background: white;
            font-weight: 500;
        }
        
        .form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
            background: white;
            outline: none;
        }
        
        .form-control:hover {
            border-color: #764ba2;
        }
        
        textarea.form-control {
            resize: vertical;
            min-height: 100px;
        }
        
        .btn-group {
            display: flex;
            gap: 15px;
            margin-top: 20px;
            flex-wrap: wrap;
        }
        
        .btn {
            border-radius: 25px;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85em;
            letter-spacing: 0.5px;
            padding: 15px 30px;
            transition: all 0.3s ease;
            border: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .btn-add {
            background: linear-gradient(135deg, #2ecc71, #27ae60);
            color: white;
        }
        
        .btn-add:hover {
            background: linear-gradient(135deg, #27ae60, #1e8449);
            color: white;
        }
        
        .btn-save {
            background: linear-gradient(135deg, #f39c12, #e67e22);
            color: white;
        }
        
        .btn-save:hover {
            background: linear-gradient(135deg, #e67e22, #d35400);
            color: white;
        }
        
        .btn-delete {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
        }
        
        .btn-delete:hover {
            background: linear-gradient(135deg, #c0392b, #a93226);
            color: white;
        }
        
        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            margin-top: 30px;
            padding: 15px 25px;
            border-radius: 25px;
            background: rgba(102, 126, 234, 0.1);
            transition: all 0.3s ease;
        }
        
        .back-link:hover {
            background: rgba(102, 126, 234, 0.2);
            transform: translateX(-5px);
            color: #764ba2;
            text-decoration: none;
        }
        
        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #7f8c8d;
        }
        
        .empty-state h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: #34495e;
        }
        
        .service-counter {
            background: rgba(102, 126, 234, 0.1);
            color: #667eea;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 20px;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .header {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 2rem;
                flex-direction: column;
                gap: 10px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .service-form {
                padding: 25px 20px;
            }
            
            .btn-group {
                flex-direction: column;
            }
            
            .btn {
                width: 100%;
                justify-content: center;
            }
            
            .form-control {
                padding: 12px 15px;
            }
        }
        
        /* Animații pentru formulare */
        .service-form {
            animation: slideInLeft 0.6s ease-out;
            animation-fill-mode: both;
        }
        
        .add-form { animation-delay: 0.1s; }
        .edit-form:nth-of-type(1) { animation-delay: 0.2s; }
        .edit-form:nth-of-type(2) { animation-delay: 0.3s; }
        .edit-form:nth-of-type(3) { animation-delay: 0.4s; }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        /* Loading states */
        .btn.loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        .btn.loading::after {
            content: '⏳';
            margin-left: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="main-card">
            <div class="header">
                <h1>
                    💼 Gestionare Servicii
                </h1>
                <p>Administrează serviciile oferite pentru consultanța în alăptare</p>
            </div>
            
            <div class="content">
                <?php if (isset($message)): ?>
                    <div class="message">
                        ✅ <?= htmlspecialchars($message) ?>
                    </div>
                <?php endif; ?>

                <div class="service-counter">
                    📊 Total servicii: <?= count($services) ?>
                </div>

                <h2 class="section-title">
                    ➕ Adaugă Serviciu Nou
                </h2>
                <form method="POST" class="service-form add-form">
                    <input type="hidden" name="action" value="add">
                    
                    <div class="form-group">
                        <label class="form-label" for="new_name">
                            🏷️ Nume serviciu
                        </label>
                        <input type="text" id="new_name" name="name" class="form-control" 
                               placeholder="ex: Consultație inițială alăptare" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="new_price">
                            💰 Preț
                        </label>
                        <input type="text" id="new_price" name="price" class="form-control" 
                               placeholder="ex: 150 RON sau De la 120 RON" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="new_description">
                            📝 Descriere
                        </label>
                        <textarea id="new_description" name="description" class="form-control" 
                                  placeholder="Descrierea detaliată a serviciului oferit..."></textarea>
                    </div>
                    
                    <div class="btn-group">
                        <button type="submit" class="btn btn-add">
                            ➕ Adaugă Serviciu
                        </button>
                    </div>
                </form>

                <?php if (!empty($services)): ?>
                    <h2 class="section-title">
                        ✏️ Servicii Existente
                    </h2>
                    
                    <?php foreach ($services as $index => $s): ?> 
                    <form method="POST" class="service-form edit-form">
                        <input type="hidden" name="action" value="update">
                        <input type="hidden" name="id" value="<?= $s['id'] ?>">
                        
                        <div class="form-group">
                            <label class="form-label" for="name_<?= $s['id'] ?>">
                                🏷️ Nume serviciu
                            </label>
                            <input type="text" id="name_<?= $s['id'] ?>" name="name" class="form-control" 
                                   value="<?= htmlspecialchars($s['name']) ?>" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="price_<?= $s['id'] ?>">
                                💰 Preț
                            </label>
                            <input type="text" id="price_<?= $s['id'] ?>" name="price" class="form-control" 
                                   value="<?= htmlspecialchars($s['price']) ?>" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="desc_<?= $s['id'] ?>">
                                📝 Descriere
                            </label>
                            <textarea id="desc_<?= $s['id'] ?>" name="description" class="form-control"><?= htmlspecialchars($s['description'] ?? '') ?></textarea>
                        </div>
                        
                        <div class="btn-group">
                            <button type="submit" class="btn btn-save">
                                💾 Salvează Modificările
                            </button>
                            
                            <button type="submit" name="action" value="delete" class="btn btn-delete" 
                                    onclick="return confirm('⚠️ Ești sigur că vrei să ștergi acest serviciu?\n\nAceastă acțiune nu poate fi anulată!')">
                                🗑️ Șterge Serviciu
                            </button>
                        </div>
                    </form> 
                    <?php endforeach; ?>
                    
                <?php else: ?>
                    <div class="empty-state">
                        <h3>📋 Nu există servicii</h3>
                        <p>Începe prin a adăuga primul serviciu folosind formularul de mai sus.</p>
                    </div>
                <?php endif; ?>

                <a href="admin_dashboard.php" class="back-link">
                    ← Înapoi la Dashboard
                </a>
            </div>
        </div>
    </div>

    <script>
        // Efecte interactive
        document.addEventListener('DOMContentLoaded', function() {
            const forms = document.querySelectorAll('form');
            
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    const submitBtn = this.querySelector('button[type="submit"]:not([name="action"])') || 
                                    this.querySelector('button[type="submit"]');
                    
                    if (submitBtn && !submitBtn.name) {
                        submitBtn.classList.add('loading');
                        submitBtn.innerHTML = submitBtn.innerHTML.replace('💾', '⏳');
                    }
                });
            });
            
            // Animație pentru input focus
            const inputs = document.querySelectorAll('.form-control');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.style.transform = 'scale(1.02)';
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.style.transform = 'scale(1)';
                });
            });
            
            // Auto-save draft pentru formular nou
            const newForm = document.querySelector('.add-form');
            if (newForm) {
                const inputs = newForm.querySelectorAll('.form-control');
                inputs.forEach(input => {
                    input.addEventListener('input', function() {
                        localStorage.setItem('draft_' + this.name, this.value);
                    });
                    
                    // Restore draft
                    const draft = localStorage.getItem('draft_' + input.name);
                    if (draft) {
                        input.value = draft;
                    }
                });
                
                // Clear draft on submit
                newForm.addEventListener('submit', function() {
                    inputs.forEach(input => {
                        localStorage.removeItem('draft_' + input.name);
                    });
                });
            }
        });
    </script>
</body>
</html>