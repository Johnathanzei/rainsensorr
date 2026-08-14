<?php

include "connect.php";

$data = json_decode(file_get_contents("php://input"), true);

$action = $data["action"] ?? "get";


// =========================
// โหลดข้อมูล
// =========================
if ($action == "get") {

    $sql = "SELECT
                id,
                repeat_type AS `repeat`,
                start_time AS startTime,
                end_time AS endTime
            FROM schedule";

    $result = $conn->query($sql);

    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);

}


// =========================
// เพิ่มข้อมูล
// =========================
elseif ($action == "add") {

    $repeat = $data["repeat"];
    $start = $data["startTime"];
    $end = $data["endTime"];

    $sql = "INSERT INTO schedule
            (repeat_type, start_time, end_time)
            VALUES
            ('$repeat', '$start', '$end')";

    if ($conn->query($sql)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }

}


// =========================
// แก้ไขข้อมูล
// =========================
elseif ($action == "update") {

    $id = $data["id"];
    $repeat = $data["repeat"];
    $start = $data["startTime"];
    $end = $data["endTime"];

    $sql = "UPDATE schedule
            SET repeat_type='$repeat',
                start_time='$start',
                end_time='$end'
            WHERE id=$id";

    if ($conn->query($sql)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }

}


// =========================
// ลบข้อมูล
// =========================
elseif ($action == "delete") {

    $id = $data["id"];

    $sql = "DELETE FROM schedule WHERE id=$id";

    if ($conn->query($sql)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }

}


$conn->close();

?>