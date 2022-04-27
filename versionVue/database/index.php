<?php
require_once("connect.php");
date_default_timezone_set('Asia/Taipei');
if (!empty($_POST["email_l"]) && !empty($_POST["password_l"])) { //登陸
    $sql = "SELECT * FROM users WHERE email=:email";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['email' => $_POST["email_l"]]);
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!empty($data)) { //確認是否取得資料
        if (password_verify($_POST["password_l"], $data["password"])) { //比對密碼
            $data = json_encode($data);
            echo $data;
        } else {
            echo false;
        }
    } else {
        echo false;
    }
} else if (!empty($_POST["email_r"]) && !empty($_POST["password_r"]) && !empty($_POST["password_r_check"])) { //註冊
    $sql = "SELECT COUNT(email) FROM users WHERE email=:email";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['email' => $_POST["email_r"]]);
    $count = $stmt->fetchColumn();
    if ($count >= 1) {
        echo false;
    } else {
        $today = date("Y-m-d H:i:s");
        $sql = "INSERT INTO users (email, password, created_at,updated_at) VALUES (?,?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$_POST["email_r"], password_hash($_POST["password_r"], PASSWORD_DEFAULT), $today, $today]);
        echo true;
    }
}
