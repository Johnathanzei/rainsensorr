<?php
$conn = new mysqli("localhost","root","","raindryer");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>