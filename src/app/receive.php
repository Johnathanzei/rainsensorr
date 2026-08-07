<?php
header("Content-Type: application/json");
include "db.php";

$temperature = $_POST['temperature'];
$humidity = $_POST['humidity'];
$rain = $_POST['rain'];

$sql = "INSERT INTO sensor_data (temperature, humidity, rain)
VALUES ('$temperature','$humidity','$rain')";

if($conn->query($sql)){
    echo json_encode(["status"=>"ok"]);
}else{
    echo json_encode(["status"=>"error"]);
}
?>