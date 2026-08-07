<?php
header("Content-Type: application/json");
include "db.php";

$sql = "SELECT * FROM sensor_data ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if($row = $result->fetch_assoc()){
    echo json_encode($row);
}else{
    echo json_encode(["temperature"=>0,"humidity"=>0,"rain"=>0]);
}
?>