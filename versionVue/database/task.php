<?php
require_once("connect.php");
date_default_timezone_set('Asia/Taipei');

if (!empty($_POST["add_task"])) {//新增task
    $today = date("Y-m-d H:i:s");
    $sql = "INSERT INTO task (user_id,title,content,created_at,updated_at) VALUES (?,?,?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$_POST["user_id"], $_POST["title"], $_POST["content"], $today, $today]);
    echo true;
} else if (!empty($_POST["get_task"])) {//讀取task
    $sql = "SELECT * FROM task WHERE user_id=:user_id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['user_id' => $_POST["user_id"]]);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $data = json_encode($data);
    echo $data;
}else if(!empty($_POST["edit_task"])){//編輯task
    $today = date("Y-m-d H:i:s");
    $sql = "UPDATE task SET title=?, content=?, schedule=? ,updated_at=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$_POST["title"], $_POST["content"], $_POST["schedule"], $today, $_POST["id"]]);
    echo true;
}else if(!empty($_POST["delete_task"])){//刪除task
    $sql = "DELETE FROM task WHERE id=:id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['id' => $_POST["id"]]);
    echo true;
}
