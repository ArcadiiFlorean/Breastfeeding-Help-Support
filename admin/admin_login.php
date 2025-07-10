<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Ex: admin / parola123 (o poți schimba)
    if ($username === 'admin' && $password === 'parola123') {
        $_SESSION['admin_logged_in'] = true;
        header("Location: admin_dashboard.php");
        exit;
    } else {
        $error = "Date de autentificare incorecte!";
    }
}
?>

<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <title>Login Admin</title>
  <style>
    body { font-family: Arial; background: #fef6f2; padding: 50px; }
    .login-box { background: #fff; padding: 30px; max-width: 400px; margin: auto; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <div class="login-box">
    <h2>Login Admin</h2>
    <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
    <form method="POST">
      <input type="text" name="username" placeholder="Username" required style="width:100%;padding:10px;margin-bottom:10px;">
      <input type="password" name="password" placeholder="Parolă" required style="width:100%;padding:10px;margin-bottom:10px;">
      <button type="submit" style="padding:10px 20px;background:#cb8645;color:#fff;border:none;border-radius:5px;">Login</button>
    </form>
  </div>
</body>
</html>
