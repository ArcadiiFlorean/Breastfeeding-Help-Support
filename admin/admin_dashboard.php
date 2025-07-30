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
    
    // STATISTICĂ PENTRU TESTIMONIALS - Folosim tabelul nostru nou
    $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM testimonials_simple WHERE status = 'active'");
    $stmt->execute();
    $recenzii_active = $stmt->fetch()['total'] ?? 0;
   
// STATISTICĂ PENTRU DOCUMENTE - NOUĂ ///////////////////////////////////////////////////////////////////////////////
$stmt = $pdo->prepare("SELECT COUNT(*) as total FROM documents WHERE status = 'active'");
$stmt->execute();
$documente_active = $stmt->fetch()['total'] ?? 0;

    
} catch (PDOException $e) {
    // Valori default în caz de eroare
    $rezervari_active = 0;
    $clienti_noi = 0;
    $satisfactie = 95;
    $recenzii_active = 0;
}
?>

<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Consultant Alăptare</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%);
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
            max-width: 1400px;
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
            cursor: pointer;
            border: none;
        }
        
        .dashboard-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255, 155, 155, 0.05) 0%, transparent 100%);
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
            transform: scale(1.1) rotate(5deg);
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
        
        .card-testimonials .card-icon {
            background: linear-gradient(135deg, #fd79a8, #e84393);
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
        
        .card-testimonials .card-action {
            background: linear-gradient(135deg, #fd79a8, #e84393);
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
            max-width: 1000px;
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
        .dashboard-card:nth-child(5) { animation-delay: 0.5s; }
        
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
        
        .stats-bar {
            animation: fadeIn 1s ease-out 0.5s both;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Modal pentru testimonials cu nou design */
        .modal-dialog {
            max-width: 900px;
        }
        
        .modal-content {
            border-radius: 25px;
            border: none;
            box-shadow: 0 25px 80px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        
        .modal-header {
            background: linear-gradient(135deg, #fd79a8, #e84393);
            border-radius: 25px 25px 0 0;
            border-bottom: none;
            padding: 25px 30px;
            color: white;
        }
        
        .modal-title {
            font-size: 1.8rem;
            font-weight: 700;
        }
        
        .btn-close-white {
            opacity: 0.8;
            filter: brightness(0) invert(1);
        }
        
        /* Stil nou pentru tab-uri */
        .nav-tabs {
            border-bottom: none;
            margin-bottom: 30px;
            gap: 10px;
        }
        
        .nav-tabs .nav-link {
            border: none;
            border-radius: 20px;
            padding: 15px 25px;
            font-weight: 600;
            color: #6c757d;
            background: #f8f9fa;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .nav-tabs .nav-link.active {
            background: linear-gradient(135deg, #fd79a8, #e84393);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(253, 121, 168, 0.3);
        }
        
        .nav-tabs .nav-link:hover:not(.active) {
            background: #e9ecef;
            transform: translateY(-1px);
            color: #495057;
        }
        
        /* Formular modern pentru adăugare */
        .testimonial-form {
            background: linear-gradient(135deg, #fff5f8, #f8f9fa);
            border-radius: 20px;
            padding: 30px;
            border: 1px solid #fd79a8;
            position: relative;
            overflow: hidden;
        }
        
        .testimonial-form::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(135deg, #fd79a8, #e84393);
        }
        
        .form-floating {
            margin-bottom: 20px;
        }
        
        .form-floating > .form-control {
            border-radius: 15px;
            border: 2px solid #e9ecef;
            transition: all 0.3s ease;
            height: auto;
            padding: 15px;
        }
        
        .form-floating > .form-control:focus {
            border-color: #fd79a8;
            box-shadow: 0 0 0 0.2rem rgba(253, 121, 168, 0.25);
            transform: translateY(-2px);
        }
        
        .form-floating > label {
            color: #6c757d;
            font-weight: 500;
        }
        
        .form-floating > .form-control:focus ~ label,
        .form-floating > .form-control:not(:placeholder-shown) ~ label {
            color: #fd79a8;
            font-weight: 600;
        }
        
        /* Textarea special pentru testimonial text */
        #testimonialText {
            min-height: 120px;
            resize: vertical;
        }
        
        /* Rating selector elegant */
        .rating-container {
            background: white;
            border-radius: 15px;
            padding: 20px;
            border: 2px solid #e9ecef;
            text-align: center;
            margin-bottom: 20px;
        }
        
        .rating-stars {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
        }
        
        .rating-star {
            font-size: 2rem;
            color: #ddd;
            cursor: pointer;
            transition: all 0.3s ease;
            transform-origin: center;
        }
        
        .rating-star:hover,
        .rating-star.active {
            color: #ffd700;
            transform: scale(1.2);
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
        
        /* Buton de submit elegant */
        .btn-save-testimonial {
            background: linear-gradient(135deg, #fd79a8, #e84393);
            border: none;
            border-radius: 20px;
            padding: 15px 40px;
            font-weight: 700;
            font-size: 1.1rem;
            color: white;
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
            width: 100%;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .btn-save-testimonial::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
        }
        
        .btn-save-testimonial:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(253, 121, 168, 0.4);
            background: linear-gradient(135deg, #e84393, #d63384);
        }
        
        .btn-save-testimonial:hover::before {
            left: 100%;
        }
        
        /* Lista de testimonials modernă */
        .testimonial-item {
            background: white;
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 20px;
            border: 1px solid #e9ecef;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .testimonial-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(135deg, #fd79a8, #e84393);
            transform: scaleY(0);
            transition: transform 0.3s ease;
        }
        
        .testimonial-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.1);
            border-color: #fd79a8;
        }
        
        .testimonial-item:hover::before {
            transform: scaleY(1);
        }
        
        .testimonial-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .testimonial-badge {
            background: linear-gradient(135deg, #fd79a8, #e84393);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .btn-delete-testimonial {
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            border: none;
            border-radius: 10px;
            padding: 8px 15px;
            color: white;
            transition: all 0.3s ease;
        }
        
        .btn-delete-testimonial:hover {
            transform: scale(1.1);
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
            background: linear-gradient(135deg, #ee5a52, #dc3545);
        }
        
        .testimonial-text {
            font-style: italic;
            line-height: 1.7;
            color: #495057;
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #fd79a8;
        }
        
        .testimonial-meta {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .testimonial-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #fd79a8, #e84393);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 1.2rem;
        }
        
        .testimonial-info h6 {
            margin: 0;
            color: #2c3e50;
            font-weight: 700;
        }
        
        .testimonial-info small {
            color: #6c757d;
        }
        
        /* Empty state design */
        .testimonials-empty {
            text-align: center;
            padding: 50px 20px;
            color: #6c757d;
        }
        
        .testimonials-empty i {
            font-size: 4rem;
            margin-bottom: 20px;
            color: #fd79a8;
            opacity: 0.7;
        }
        
        /* Loading animation */
        .testimonials-loading {
            text-align: center;
            padding: 50px;
        }
        
        .spinner-border {
            width: 3rem;
            height: 3rem;
            border-width: 4px;
        }
        
        .text-primary {
            color: #fd79a8 !important;
        }
        .card-documents .card-icon {
    background: linear-gradient(135deg, #a8e6cf, #7fcdcd);
    color: white;
}

.card-documents .card-action {
    background: linear-gradient(135deg, #a8e6cf, #7fcdcd);
    color: white;
}

/* STILURI PENTRU MODAL DOCUMENTE */
.modal-header.documents-header {
    background: linear-gradient(135deg, #a8e6cf, #7fcdcd);
}

.nav-tabs .nav-link.active.documents-tab {
    background: linear-gradient(135deg, #a8e6cf, #7fcdcd);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(168, 230, 207, 0.3);
}

.text-documents {
    color: #a8e6cf !important;
}

/* STILURI PENTRU FORMULARUL DE DOCUMENTE */
.documents-upload-area {
    border: 3px dashed #a8e6cf;
    border-radius: 20px;
    padding: 40px 20px;
    text-align: center;
    background: linear-gradient(135deg, rgba(168, 230, 207, 0.1), rgba(127, 205, 205, 0.1));
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
}

.documents-upload-area:hover {
    border-color: #7fcdcd;
    background: linear-gradient(135deg, rgba(168, 230, 207, 0.2), rgba(127, 205, 205, 0.2));
    transform: translateY(-5px);
}

.documents-upload-area.dragover {
    border-color: #5fa8a8;
    background: linear-gradient(135deg, rgba(168, 230, 207, 0.3), rgba(127, 205, 205, 0.3));
    transform: scale(1.02);
}

.upload-icon {
    font-size: 4rem;
    color: #7fcdcd;
    margin-bottom: 20px;
    transition: all 0.3s ease;
}

.documents-upload-area:hover .upload-icon {
    transform: scale(1.1) rotate(5deg);
    color: #5fa8a8;
}

.form-floating.documents > .form-control:focus {
    border-color: #a8e6cf;
    box-shadow: 0 0 0 0.2rem rgba(168, 230, 207, 0.25);
}

.form-floating.documents > .form-control:focus ~ label,
.form-floating.documents > .form-control:not(:placeholder-shown) ~ label {
    color: #a8e6cf;
    font-weight: 600;
}

/* BUTON PENTRU DOCUMENTE */
.btn-save-document {
    background: linear-gradient(135deg, #a8e6cf, #7fcdcd);
    border: none;
    border-radius: 20px;
    padding: 15px 40px;
    font-weight: 700;
    font-size: 1.1rem;
    color: white;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    width: 100%;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.btn-save-document::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
}

.btn-save-document:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(168, 230, 207, 0.4);
    background: linear-gradient(135deg, #7fcdcd, #5fa8a8);
}

.btn-save-document:hover::before {
    left: 100%;
}

/* STILURI PENTRU LISTA DE DOCUMENTE */
.document-item {
    background: white;
    border-radius: 20px;
    padding: 25px;
    margin-bottom: 20px;
    border: 1px solid #e9ecef;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.document-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(135deg, #a8e6cf, #7fcdcd);
    transform: scaleY(0);
    transition: transform 0.3s ease;
}

.document-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.1);
    border-color: #a8e6cf;
}

.document-item:hover::before {
    transform: scaleY(1);
}

.document-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.document-badge {
    background: linear-gradient(135deg, #a8e6cf, #7fcdcd);
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
}

.document-icon {
    width: 50px;
    height: 50px;
    border-radius: 15px;
    background: linear-gradient(135deg, #a8e6cf, #7fcdcd);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 1.5rem;
}

.btn-delete-document {
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
    border: none;
    border-radius: 10px;
    padding: 8px 15px;
    color: white;
    transition: all 0.3s ease;
}

.btn-delete-document:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
    background: linear-gradient(135deg, #ee5a52, #dc3545);
}

/* Empty state design pentru documente */
.documents-empty {
    text-align: center;
    padding: 50px 20px;
    color: #6c757d;
}

.documents-empty i {
    font-size: 4rem;
    margin-bottom: 20px;
    color: #a8e6cf;
    opacity: 0.7;
}

/* Loading animation pentru documente */
.documents-loading {
    text-align: center;
    padding: 50px;
}

/* Progress bar pentru upload */
.upload-progress {
    width: 100%;
    height: 8px;
    background: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 15px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.upload-progress.show {
    opacity: 1;
}

.progress-bar-documents {
    height: 100%;
    background: linear-gradient(135deg, #a8e6cf, #7fcdcd);
    width: 0%;
    transition: width 0.3s ease;
    border-radius: 4px;
}
    </style>
</head>
<body>

    <div class="dashboard-container">
    <div class="header">
    <h1>🌸 Pufet</h1>
    <p>Cu drag, pentru Pufica – sprijinul mamelor, inspirația mea</p>
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
            <div class="stat-item">
                <h3 id="testimonials-count"><?php echo $recenzii_active; ?></h3>
                <p>Recenzii</p>
            </div>
            <div class="stat-item">
    <h3 id="documents-count"><?php echo $documente_active; ?></h3>
    <p>Documente</p>
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

            <!-- CARD PENTRU TESTIMONIALS -->
            <button type="button" class="dashboard-card card-testimonials" onclick="openTestimonialsModal()">
                <div class="card-icon">💖</div>
                <h3 class="card-title">Recenzii Clienți</h3>
                <p class="card-description">Adaugă și gestionează recenziile clienților care apar automat pe site</p>
                <div class="card-action">
                    ⭐ Gestionează recenzii
                </div>
            </button>
<button type="button" class="dashboard-card card-documents" onclick="openDocumentsModal()">
    <div class="card-icon">📁</div>
    <h3 class="card-title">Documente pentru Clienți</h3>
    <p class="card-description">Încarcă ghiduri, formulare și resurse pentru mamele care te urmăresc</p>
    <div class="card-action">
        📤 Gestionează documente
    </div>
</button>
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

    <!-- Modal pentru Testimonials cu design nou -->
    <div class="modal fade" id="testimonialsModal" tabindex="-1" aria-labelledby="testimonialsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="testimonialsModalLabel">
                        <i class="fas fa-heart me-3"></i>Gestionare Recenzii
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Tab-uri noi moderne -->
                    <ul class="nav nav-tabs" id="testimonialsTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="add-tab" data-bs-toggle="tab" data-bs-target="#add-testimonial" type="button" role="tab">
                                <i class="fas fa-plus-circle me-2"></i>Adaugă Recenzie Nouă
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="list-tab" data-bs-toggle="tab" data-bs-target="#list-testimonials" type="button" role="tab">
                                <i class="fas fa-list-stars me-2"></i>Toate Recenziile
                            </button>
                        </li>
                    </ul>

                    <div class="tab-content" id="testimonialsTabContent">
                        <!-- Tab pentru Adăugare cu design nou -->
                        <div class="tab-pane fade show active" id="add-testimonial" role="tabpanel">
                            <div class="testimonial-form">
                                <div class="text-center mb-4">
                                    <i class="fas fa-quote-left fa-3x text-primary mb-3"></i>
                                    <h4 class="text-primary">Adaugă o nouă recenzie</h4>
                                    <p class="text-muted">Completează formularul pentru a adăuga o recenzie care va apărea automat pe site</p>
                                </div>

                                <form id="testimonialForm">
                                    <div class="form-floating">
                                        <textarea class="form-control" id="testimonialText" placeholder="Scrie aici textul recenziei..." required></textarea>
                                        <label for="testimonialText">
                                            <i class="fas fa-comment me-2"></i>Textul Recenziei *
                                        </label>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" id="testimonialName" placeholder="Ex: Ana Maria" required>
                                                <label for="testimonialName">
                                                    <i class="fas fa-user me-2"></i>Numele Clientei *
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" id="testimonialRole" placeholder="Ex: Mamă din București" required>
                                                <label for="testimonialRole">
                                                    <i class="fas fa-map-marker-alt me-2"></i>Descrierea *
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="rating-container">
                                        <label class="form-label fw-bold text-center d-block">
                                            <i class="fas fa-star me-2 text-warning"></i>Rating (1-5 stele)
                                        </label>
                                        <div class="rating-stars" id="rating-stars">
                                            <span class="rating-star" data-rating="1">⭐</span>
                                            <span class="rating-star" data-rating="2">⭐</span>
                                            <span class="rating-star" data-rating="3">⭐</span>
                                            <span class="rating-star" data-rating="4">⭐</span>
                                            <span class="rating-star" data-rating="5">⭐</span>
                                        </div>
                                        <input type="hidden" id="testimonialRating" value="5">
                                    </div>
                                    
                                    <button type="submit" class="btn-save-testimonial">
                                        <i class="fas fa-heart me-2"></i>Salvează Recenzia
                                    </button>
                                </form>
                            </div>
                        </div>

                        <!-- Tab pentru Lista cu design nou -->
                        <div class="tab-pane fade" id="list-testimonials" role="tabpanel">
                            <div id="testimonials-loading" class="testimonials-loading" style="display: none;">
                                <div class="spinner-border text-primary" role="status"></div>
                                <p class="mt-3 text-muted">Se încarcă recenziile...</p>
                            </div>
                            
                            <div id="testimonials-list"></div>
                            
                            <div id="testimonials-empty" class="testimonials-empty" style="display: none;">
                                <i class="fas fa-heart-broken"></i>
                                <h5 class="text-muted mb-3">Nu există recenzii încă</h5>
                                <p class="text-muted">Adaugă prima recenzie pentru a o vedea aici și pe site</p>
                                <button class="btn btn-outline-primary" onclick="document.getElementById('add-tab').click()">
                                    <i class="fas fa-plus me-2"></i>Adaugă Prima Recenzie
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
        
        // Variabile globale pentru testimonials
        let testimonialsData = [];
        let selectedRating = 5;
        const API_BASE = 'testimonials_admin_api.php';

        // Deschide modal-ul pentru testimonials
        function openTestimonialsModal() {
            const modal = new bootstrap.Modal(document.getElementById('testimonialsModal'));
            modal.show();
            loadTestimonialsCount();
            initRatingSystem();
        }

        // Sistem de rating interactiv
        function initRatingSystem() {
            const stars = document.querySelectorAll('.rating-star');
            
            stars.forEach((star, index) => {
                star.addEventListener('click', () => {
                    selectedRating = index + 1;
                    updateStarDisplay();
                    document.getElementById('testimonialRating').value = selectedRating;
                });
                
                star.addEventListener('mouseenter', () => {
                    highlightStars(index + 1);
                });
            });
            
            document.getElementById('rating-stars').addEventListener('mouseleave', () => {
                updateStarDisplay();
            });
            
            // Set default 5 stars
            updateStarDisplay();
        }
        
        function highlightStars(rating) {
            const stars = document.querySelectorAll('.rating-star');
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        }
        
        function updateStarDisplay() {
            highlightStars(selectedRating);
        }

        // Încarcă numărul de recenzii
        async function loadTestimonialsCount() {
            try {
                const response = await fetch(API_BASE);
                const data = await response.json();
                
                if (data.success) {
                    document.getElementById('testimonials-count').textContent = data.data.length;
                    testimonialsData = data.data;
                    
                    // Animație pentru numărul de recenzii
                    const countElement = document.getElementById('testimonials-count');
                    countElement.style.transform = 'scale(1.2)';
                    countElement.style.color = '#fd79a8';
                    setTimeout(() => {
                        countElement.style.transform = 'scale(1)';
                        countElement.style.color = '';
                    }, 300);
                } else {
                    document.getElementById('testimonials-count').textContent = '0';
                }
            } catch (error) {
                console.error('Eroare la încărcarea recenziilor:', error);
                document.getElementById('testimonials-count').textContent = 'Eroare';
            }
        }

        // Încarcă lista de recenzii
        function loadTestimonialsList() {
            const listTab = new bootstrap.Tab(document.getElementById('list-tab'));
            listTab.show();
            
            const loadingEl = document.getElementById('testimonials-loading');
            const listEl = document.getElementById('testimonials-list');
            const emptyEl = document.getElementById('testimonials-empty');
            
            listEl.style.display = 'none';
            emptyEl.style.display = 'none';
            loadingEl.style.display = 'block';
            
            setTimeout(() => {
                loadingEl.style.display = 'none';
                
                if (testimonialsData.length === 0) {
                    emptyEl.style.display = 'block';
                } else {
                    displayTestimonialsList();
                    listEl.style.display = 'block';
                }
            }, 1000);
        }

        // Afișează lista de recenzii cu design nou
        function displayTestimonialsList() {
            const listEl = document.getElementById('testimonials-list');
            
            let html = '';
            testimonialsData.forEach((testimonial, index) => {
                const shortText = testimonial.text.length > 200 ? 
                    testimonial.text.substring(0, 200) + '...' : 
                    testimonial.text;
                    
                const initials = testimonial.name.split(' ').map(n => n[0]).join('');
                const starsHtml = '⭐'.repeat(testimonial.rating || 5);
                
                html += `
                    <div class="testimonial-item" style="animation: fadeInUp 0.5s ease-out ${index * 0.1}s both;">
                        <div class="testimonial-header">
                            <span class="testimonial-badge">Recenzie #${index + 1}</span>
                            <button class="btn-delete-testimonial" onclick="deleteTestimonial(${testimonial.id})" title="Șterge recenzia">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                        
                        <div class="testimonial-text">
                            "${shortText}"
                        </div>
                        
                        <div class="testimonial-meta">
                            <div class="testimonial-avatar">
                                ${initials}
                            </div>
                            <div class="testimonial-info">
                                <h6>${testimonial.name}</h6>
                                <small class="text-muted">${testimonial.role}</small>
                                <div class="mt-1">
                                    <span style="font-size: 0.9rem;">${starsHtml}</span>
                                </div>
                            </div>
                            <div class="ms-auto text-end">
                                <small class="text-muted">
                                    <i class="fas fa-calendar me-1"></i>
                                    ${new Date(testimonial.created_at).toLocaleDateString('ro-RO')}
                                </small>
                                <br>
                                <small class="text-muted">
                                    <i class="fas fa-globe me-1"></i>
                                    Vizibil pe site
                                </small>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            listEl.innerHTML = html;
        }

        // Adaugă recenzie nouă cu validare îmbunătățită
        document.getElementById('testimonialForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const text = document.getElementById('testimonialText').value.trim();
            const name = document.getElementById('testimonialName').value.trim();
            const role = document.getElementById('testimonialRole').value.trim();
            const rating = document.getElementById('testimonialRating').value;
            
            // Validări
            if (!text || text.length < 10) {
                showAlert('❌ Textul recenziei trebuie să aibă cel puțin 10 caractere!', 'danger');
                return;
            }
            
            if (!name || name.length < 2) {
                showAlert('❌ Numele trebuie să aibă cel puțin 2 caractere!', 'danger');
                return;
            }
            
            if (!role || role.length < 3) {
                showAlert('❌ Descrierea trebuie să aibă cel puțin 3 caractere!', 'danger');
                return;
            }
            
            // Animație de loading pe buton
            const submitBtn = document.querySelector('.btn-save-testimonial');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Se salvează...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(API_BASE, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text, name, role, rating })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    showAlert('✅ Recenzia a fost adăugată cu succes și apare automat pe site!', 'success');
                    
                    document.getElementById('testimonialForm').reset();
                    selectedRating = 5;
                    updateStarDisplay();
                    document.getElementById('testimonialRating').value = 5;
                    
                    loadTestimonialsCount();
                    
                    setTimeout(() => {
                        loadTestimonialsList();
                    }, 1500);
                } else {
                    showAlert('❌ Eroare la salvarea recenziei: ' + data.error, 'danger');
                }
            } catch (error) {
                showAlert('❌ Eroare de conexiune: ' + error.message, 'danger');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });

        // Șterge recenzie cu confirmare elegantă
        async function deleteTestimonial(id) {
            // Custom confirm dialog
            const result = await showConfirmDialog(
                'Șterge Recenzia',
                'Ești sigură că vrei să ștergi această recenzie? Va dispărea și de pe site!',
                'danger'
            );
            
            if (!result) return;
            
            try {
                const response = await fetch(`${API_BASE}?id=${id}`, {
                    method: 'DELETE'
                });
                
                const data = await response.json();
                
                if (data.success) {
                    showAlert('🗑️ Recenzia a fost ștearsă și nu mai apare pe site!', 'success');
                    loadTestimonialsCount();
                    setTimeout(() => {
                        loadTestimonialsList();
                    }, 1000);
                } else {
                    showAlert('❌ Eroare la ștergerea recenziei: ' + data.error, 'danger');
                }
            } catch (error) {
                showAlert('❌ Eroare de conexiune: ' + error.message, 'danger');
            }
        }

        // Sistem de alerte personalizat
        function showAlert(message, type = 'info') {
            // Creează alert-ul
            const alertHtml = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert" style="
                    position: fixed; 
                    top: 20px; 
                    right: 20px; 
                    z-index: 9999; 
                    min-width: 300px;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    animation: slideInRight 0.5s ease-out;
                ">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', alertHtml);
            
            // Auto-remove după 5 secunde
            setTimeout(() => {
                const alert = document.querySelector('.alert:last-of-type');
                if (alert) {
                    alert.remove();
                }
            }, 5000);
        }

        // Dialog de confirmare personalizat
        function showConfirmDialog(title, message, type = 'primary') {
            return new Promise((resolve) => {
                const modalHtml = `
                    <div class="modal fade" id="confirmModal" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content" style="border-radius: 20px; border: none;">
                                <div class="modal-header bg-${type} text-white" style="border-radius: 20px 20px 0 0;">
                                    <h5 class="modal-title">${title}</h5>
                                </div>
                                <div class="modal-body text-center py-4">
                                    <i class="fas fa-exclamation-triangle fa-3x text-${type} mb-3"></i>
                                    <p class="mb-0">${message}</p>
                                </div>
                                <div class="modal-footer border-0 justify-content-center">
                                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                        <i class="fas fa-times me-2"></i>Anulează
                                    </button>
                                    <button type="button" class="btn btn-${type}" id="confirmYes">
                                        <i class="fas fa-check me-2"></i>Confirmă
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.insertAdjacentHTML('beforeend', modalHtml);
                
                const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
                modal.show();
                
                document.getElementById('confirmYes').onclick = () => {
                    resolve(true);
                    modal.hide();
                };
                
                document.getElementById('confirmModal').addEventListener('hidden.bs.modal', () => {
                    document.getElementById('confirmModal').remove();
                    resolve(false);
                });
            });
        }

        // Event listeners
        document.getElementById('list-tab').addEventListener('click', loadTestimonialsList);

        // Încarcă datele la pornirea paginii
        document.addEventListener('DOMContentLoaded', function() {
            loadTestimonialsCount();
               updateDocumentsCount();
            
            // Efecte interactive pentru dashboard
            const cards = document.querySelectorAll('.dashboard-card');
            
            cards.forEach((card, index) => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02) rotateZ(1deg)';
                    this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1) rotateZ(0deg)';
                });
                
                // Stagger animation
                card.style.animationDelay = `${index * 0.1}s`;
            });
            
            // Floating animation pentru statistici
            setInterval(() => {
                const stats = document.querySelectorAll('.stat-item h3');
                stats.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.transform = 'scale(1.05)';
                        setTimeout(() => {
                            stat.style.transform = 'scale(1)';
                        }, 200);
                    }, index * 100);
                });
            }, 10000);
        });

        // CSS pentru animații
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
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
        `;
        document.head.appendChild(style);
        let documentsData = [];
const DOCUMENTS_API = 'documents_admin_api.php';

// Deschide modal-ul pentru documente
function openDocumentsModal() {
    const modal = new bootstrap.Modal(document.getElementById('documentsModal'));
    modal.show();
    loadDocuments();
    initDocumentUpload();
}

// Inițializează upload-ul de documente
function initDocumentUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('document-file');
    const uploadForm = document.getElementById('document-upload-form');
    
    // Click pentru a selecta fișier
    uploadArea.addEventListener('click', () => fileInput.click());
    
    // Drag & Drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFileSelect(files[0]);
        }
    });
    
    // Când se selectează un fișier
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });
    
    // Submit form
    uploadForm.addEventListener('submit', uploadDocument);
}

// Gestionează selecția fișierului
function handleFileSelect(file) {
    const fileName = document.getElementById('selected-file-name');
    const fileSize = document.getElementById('selected-file-size');
    const fileInfo = document.getElementById('file-info');
    
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    fileInfo.style.display = 'block';
    
    // Auto-completează titlul dacă este gol
    const titleInput = document.getElementById('document-title');
    if (!titleInput.value) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        titleInput.value = nameWithoutExt;
    }
}

// Upload document
// Upload document
async function uploadDocument(e) {
    e.preventDefault();
    
    const formData = new FormData();
    const fileInput = document.getElementById('document-file');
    const title = document.getElementById('document-title').value.trim();
    const description = document.getElementById('document-description').value.trim();
    const category = document.getElementById('document-category').value;
    const isFeatured = document.getElementById('document-featured').checked;
    const documentType = document.getElementById('document-type').value;
    const price = documentType === 'paid' ? parseFloat(document.getElementById('document-price').value) || 0 : 0;
    const isFree = documentType === 'free';
    
    if (!fileInput.files[0]) {
        showAlert('❌ Selectează un fișier pentru încărcare!', 'danger');
        return;
    }
    
    if (!title) {
        showAlert('❌ Titlul documentului este obligatoriu!', 'danger');
        return;
    }
    
    if (documentType === 'paid' && price <= 0) {
        showAlert('❌ Prețul trebuie să fie mai mare decât 0 pentru documentele cu plată!', 'danger');
        return;
    }
    
    formData.append('document', fileInput.files[0]);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('is_free', isFree ? '1' : '0');
    if (isFeatured) formData.append('is_featured', '1');
    
    const submitBtn = document.querySelector('.btn-save-document');
    const originalText = submitBtn.innerHTML;
    const progressBar = document.querySelector('.upload-progress');
    const progressFill = document.querySelector('.progress-bar-documents');
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Se încarcă...';
    submitBtn.disabled = true;
    progressBar.classList.add('show');
    
    try {
        const response = await fetch(DOCUMENTS_API, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('✅ Document încărcat cu succes! Este disponibil pentru clienți.', 'success');
            
            // Reset form
            document.getElementById('document-upload-form').reset();
            document.getElementById('selected-file-name').textContent = '';
            document.getElementById('selected-file-size').textContent = '';
            document.getElementById('file-info').style.display = 'none';
            document.getElementById('price-container').style.display = 'none';
            
            // Reload documents
            setTimeout(() => {
                loadDocuments();
                updateDocumentsCount(); 
                 
                // Switch to list tab
                const listTab = new bootstrap.Tab(document.getElementById('documents-list-tab'));
                listTab.show();
            }, 1500);
        } else {
            showAlert('❌ Eroare la încărcarea documentului: ' + data.error, 'danger');
        }
    } catch (error) {
        showAlert('❌ Eroare de conexiune: ' + error.message, 'danger');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        progressBar.classList.remove('show');
        progressFill.style.width = '0%';
    }
}

// Event listener pentru tipul de document
document.getElementById('document-type').addEventListener('change', function() {
    const priceContainer = document.getElementById('price-container');
    if (this.value === 'paid') {
        priceContainer.style.display = 'block';
        document.getElementById('document-price').required = true;
    } else {
        priceContainer.style.display = 'none';
        document.getElementById('document-price').required = false;
        document.getElementById('document-price').value = '';
    }
});
// Încarcă lista de documente
// Afișează lista de documente
// Încarcă lista de documente
async function loadDocuments() {
    const loadingEl = document.getElementById('documents-loading');
    const listEl = document.getElementById('documents-list');
    const emptyEl = document.getElementById('documents-empty');

    listEl.style.display = 'none';
    emptyEl.style.display = 'none';
    loadingEl.style.display = 'block';

    try {
        const response = await fetch(DOCUMENTS_API);
        const data = await response.json();

        if (data.success) {
            documentsData = data.data;

            setTimeout(() => {
                loadingEl.style.display = 'none';

                if (documentsData.length === 0) {
                    emptyEl.style.display = 'block';
                } else {
                    displayDocumentsList(); // ✅ logic corect aici
                    listEl.style.display = 'block';
                }
            }, 1000);
        } else {
            loadingEl.style.display = 'none';
            showAlert('❌ Eroare la încărcarea documentelor: ' + data.error, 'danger');
        }
    } catch (error) {
        loadingEl.style.display = 'none';
        showAlert('❌ Eroare de conexiune: ' + error.message, 'danger');
    }
}

// Afișează lista de documente
function displayDocumentsList() {
    const listEl = document.getElementById('documents-list');

    let html = '';
    documentsData.forEach((doc, index) => {
        const iconClass = getDocumentIcon(doc.file_type);
        const shortDescription = doc.description && doc.description.length > 100 ?
            doc.description.substring(0, 100) + '...' :
            doc.description || 'Fără descriere';

        const priceInfo = doc.is_free === 1 || doc.is_free === true ?
            '<span class="badge bg-success"><i class="fas fa-gift me-1"></i>GRATUIT</span>' :
            `<span class="badge bg-warning text-dark"><i class="fas fa-euro-sign me-1"></i>${doc.price || 0} RON</span>`;

        html += `
            <div class="document-item" style="animation: fadeInUp 0.5s ease-out ${index * 0.1}s both;">
                <div class="document-header">
                    <div class="d-flex align-items-center gap-2">
                        <span class="document-badge">Document #${index + 1}</span>
                        ${priceInfo}
                    </div>
                    <div>
                        ${doc.is_featured ? '<span class="badge bg-warning text-dark me-2">⭐ Recomandat</span>' : ''}
                        <span class="badge bg-secondary">${doc.category}</span>
                        <button class="btn-delete-document ms-2" onclick="deleteDocument(${doc.id})" title="Șterge documentul">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>

                <div class="d-flex align-items-start gap-3">
                    <div class="document-icon">
                        ${iconClass}
                    </div>

                    <div class="flex-grow-1">
                        <h6 class="fw-bold mb-2">${doc.title}</h6>
                        <p class="text-muted small mb-2">${shortDescription}</p>
                        <div class="d-flex align-items-center gap-3 text-muted small">
                            <span><i class="fas fa-file me-1"></i>${doc.original_filename}</span>
                            <span><i class="fas fa-weight me-1"></i>${doc.formatted_size}</span>
                            <span><i class="fas fa-calendar me-1"></i>${doc.created_at_formatted}</span>
                            ${doc.downloads_count > 0 ? `<span class="badge bg-info">${doc.downloads_count} descărcări</span>` : ''}
                        </div>
                        ${!(doc.is_free === 1 || doc.is_free === true) ? '<div class="mt-2"><small class="text-warning"><i class="fas fa-crown me-1"></i>Document Premium</small></div>' : ''}
                    </div>

                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-outline-primary" onclick="testDownload(${doc.id})" title="Test descărcare">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    listEl.innerHTML = html;
}

// Șterge document
async function deleteDocument(id) {
    const result = await showConfirmDialog(
        'Șterge Document',
        'Ești sigură că vrei să ștergi acest document? Nu va mai fi disponibil pentru clienți!',
        'danger'
    );
    
    if (!result) return;
    
    try {
        const response = await fetch(`${DOCUMENTS_API}?id=${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('🗑️ Document șters cu succes!', 'success');
            loadDocuments();
         updateDocumentsCount();

        } else {
            showAlert('❌ Eroare la ștergerea documentului: ' + data.error, 'danger');
        }
    } catch (error) {
        showAlert('❌ Eroare de conexiune: ' + error.message, 'danger');
    }
}

// Test descărcare document
function testDownload(id) {
    window.open(`${DOCUMENTS_API}?download=1&id=${id}`, '_blank');
}

// Actualizează contorul de documente
async function updateDocumentsCount() {
    try {
        const response = await fetch(DOCUMENTS_API);
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('documents-count').textContent = data.data.length;
            
            // Animație pentru numărul de documente
            const countElement = document.getElementById('documents-count');
            countElement.style.transform = 'scale(1.2)';
            countElement.style.color = '#a8e6cf';
            setTimeout(() => {
                countElement.style.transform = 'scale(1)';
                countElement.style.color = '';
            }, 300);
        } else {
            document.getElementById('documents-count').textContent = '0';
        }
    } catch (error) {
        console.error('Eroare la încărcarea documentelor:', error);
        document.getElementById('documents-count').textContent = 'Eroare';
    }
}

// Obține iconița documentului
function getDocumentIcon(fileType) {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('sheet')) return '📊';
    if (fileType.includes('image')) return '🖼️';
    return '📋';
}

// Formatează dimensiunea fișierului
function formatFileSize(bytes) {
    if (bytes >= 1073741824) {
        return (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
        return (bytes / 1048576).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
        return (bytes / 1024).toFixed(2) + ' KB';
    } else {
        return bytes + ' bytes';
    }
}

// Event listeners pentru documente
document.getElementById('documents-list-tab').addEventListener('click', () => {
    if (documentsData.length === 0) {
        loadDocuments();
    }
});

    </script>
    <!-- MODAL PENTRU DOCUMENTE -->
<div class="modal fade" id="documentsModal" tabindex="-1" aria-labelledby="documentsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header documents-header">
                <h5 class="modal-title" id="documentsModalLabel">
                    <i class="fas fa-folder-open me-3"></i>Gestionare Documente pentru Clienți
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <ul class="nav nav-tabs" id="documentsTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active documents-tab" id="documents-upload-tab" data-bs-toggle="tab" data-bs-target="#upload-document" type="button" role="tab">
                            <i class="fas fa-cloud-upload-alt me-2"></i>Încarcă Document Nou
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link documents-tab" id="documents-list-tab" data-bs-toggle="tab" data-bs-target="#list-documents" type="button" role="tab">
                            <i class="fas fa-list-alt me-2"></i>Toate Documentele
                        </button>
                    </li>
                </ul>

                <div class="tab-content" id="documentsTabContent">
                    <!-- Tab pentru Upload -->
                    <div class="tab-pane fade show active" id="upload-document" role="tabpanel">
                        <div class="row mt-4">
                            <div class="col-lg-8">
                                <form id="document-upload-form" enctype="multipart/form-data">
                                    <div class="documents-upload-area" id="upload-area">
                                        <div class="upload-icon">
                                            <i class="fas fa-cloud-upload-alt"></i>
                                        </div>
                                        <h4 class="text-documents mb-3">Încarcă un document</h4>
                                        <p class="text-muted mb-3">Trage și plasează fișierul aici sau fă click pentru a selecta</p>
                                        <p class="small text-muted">
                                            Formate acceptate: PDF, Word, Excel, text, imagini<br>
                                            Dimensiune maximă: 10MB
                                        </p>
                                        <input type="file" id="document-file" name="document" accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif,.webp" style="display: none;">
                                        
                                        <div class="upload-progress">
                                            <div class="progress-bar-documents"></div>
                                        </div>
                                    </div>
                                    
                                    <div id="file-info" class="mt-3" style="display: none;">
                                        <div class="alert alert-info">
                                            <i class="fas fa-file me-2"></i>
                                            <strong>Fișier selectat:</strong>
                                            <span id="selected-file-name"></span>
                                            (<span id="selected-file-size"></span>)
                                        </div>
                                    </div>
                                    
                                    <div class="row mt-4">
                                        <div class="col-md-12">
                                            <div class="form-floating documents mb-3">
                                                <input type="text" class="form-control" id="document-title" placeholder="Ex: Ghid Alăptare pentru Începătoare" required>
                                                <label for="document-title">
                                                    <i class="fas fa-heading me-2"></i>Titlul Documentului *
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-8">
                                            <div class="form-floating documents mb-3">
                                                <textarea class="form-control" id="document-description" placeholder="Descrie documentul..." style="height: 100px;"></textarea>
                                                <label for="document-description">
                                                    <i class="fas fa-align-left me-2"></i>Descriere (opțional)
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-4">
                                            <div class="form-floating documents mb-3">
                                                <select class="form-select" id="document-category">
                                                    <!-- CÂMPURI NOI PENTRU PREȚURI -->
<div class="col-md-6">
    <div class="form-floating documents mb-3">
        <select class="form-select" id="document-type">
            <option value="free">Gratuit</option>
            <option value="paid">Cu plată</option>
        </select>
        <label for="document-type">
            <i class="fas fa-tag me-2"></i>Tipul Documentului
        </label>
    </div>
</div>

<div class="col-md-6" id="price-container" style="display: none;">
    <div class="form-floating documents mb-3">
        <input type="number" class="form-control" id="document-price" placeholder="0.00" step="0.01" min="0">
        <label for="document-price">
            <i class="fas fa-euro-sign me-2"></i>Preț (RON)
        </label>
    </div>
</div>
                                                    <option value="general">General</option>
                                                    <option value="ghiduri">Ghiduri</option>
                                                    <option value="formulare">Formulare</option>
                                                    <option value="resurse">Resurse</option>
                                                    <option value="exercitii">Exerciții</option>
                                                    <option value="planuri">Planuri Alimentare</option>
                                                </select>
                                                <label for="document-category">
                                                    <i class="fas fa-folder me-2"></i>Categoria
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-check mb-4">
                                        <input class="form-check-input" type="checkbox" id="document-featured">
                                        <label class="form-check-label fw-bold text-warning" for="document-featured">
                                            <i class="fas fa-star me-2"></i>Marchează ca document recomandat
                                        </label>
                                        <div class="form-text">Documentele recomandate apar primul în lista pentru clienți</div>
                                    </div>
                                    
                                    <button type="submit" class="btn-save-document">
                                        <i class="fas fa-upload me-2"></i>Încarcă Documentul
                                    </button>
                                </form>
                            </div>
                            
                            <div class="col-lg-4">
                                <div class="card" style="border-radius: 20px; border: 2px solid #a8e6cf;">
                                    <div class="card-header text-center" style="background: linear-gradient(135deg, #a8e6cf, #7fcdcd); color: white; border-radius: 18px 18px 0 0;">
                                        <i class="fas fa-info-circle fa-2x mb-2"></i>
                                        <h5 class="mb-0">Informații Importante</h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="mb-3">
                                            <h6 class="text-documents">📋 Tipuri de documente</h6>
                                            <ul class="small text-muted">
                                                <li>Ghiduri de alăptare (PDF)</li>
                                                <li>Formulare de consultație</li>
                                                <li>Planuri alimentare</li>
                                                <li>Exerciții și tehnici</li>
                                                <li>Resurse educaționale</li>
                                            </ul>
                                        </div>
                                        
                                        <div class="mb-3">
                                            <h6 class="text-documents">⭐ Documente recomandate</h6>
                                            <p class="small text-muted">Documentele marcate ca recomandate vor apărea primul în lista pentru clienți și vor avea o iconiță specială.</p>
                                        </div>
                                        
                                        <div class="mb-3">
                                            <h6 class="text-documents">🔒 Securitate</h6>
                                            <p class="small text-muted">Documentele sunt stocate securizat și accesibile doar clienților de pe site-ul tău.</p>
                                        </div>
                                        
                                        <div class="alert alert-warning small">
                                            <i class="fas fa-exclamation-triangle me-2"></i>
                                            <strong>Notă:</strong> După încărcare, documentul va fi imediat disponibil pentru descărcare pe pagina principală.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tab pentru Lista -->
                    <div class="tab-pane fade" id="list-documents" role="tabpanel">
                        <div class="d-flex justify-content-between align-items-center mt-4 mb-4">
                            <h4 class="text-documents">
                                <i class="fas fa-folder-open me-2"></i>Documentele Tale
                            </h4>
                            <div class="d-flex gap-2">
                                <select class="form-select form-select-sm" id="filter-category" style="width: auto;">
                                    <option value="">Toate categoriile</option>
                                    <option value="general">General</option>
                                    <option value="ghiduri">Ghiduri</option>
                                    <option value="formulare">Formulare</option>
                                    <option value="resurse">Resurse</option>
                                    <option value="exercitii">Exerciții</option>
                                    <option value="planuri">Planuri Alimentare</option>
                                </select>
                                <button class="btn btn-outline-primary btn-sm" onclick="loadDocuments()">
                                    <i class="fas fa-sync-alt"></i> Reîncarcă
                                </button>
                            </div>
                        </div>
                        
                        <div id="documents-loading" class="documents-loading" style="display: none;">
                            <div class="spinner-border text-documents" role="status"></div>
                            <p class="mt-3 text-muted">Se încarcă documentele...</p>
                        </div>
                        
                        <div id="documents-list"></div>
                        
                        <div id="documents-empty" class="documents-empty" style="display: none;">
                            <i class="fas fa-folder-open"></i>
                            <h5 class="text-muted mb-3">Nu există documente încă</h5>
                            <p class="text-muted">Adaugă primul document pentru a-l vedea aici și pe site</p>
                            <button class="btn btn-outline-success" onclick="document.getElementById('documents-upload-tab').click()">
                                <i class="fas fa-plus me-2"></i>Adaugă Primul Document
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>