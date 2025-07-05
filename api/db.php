<?php
$conn = new mysqli("localhost", "root", "", "lactation");
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
