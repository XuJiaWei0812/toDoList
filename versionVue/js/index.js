$(function () {
    if(localStorage.getItem('user')!=null){
        location.replace('task.html');
    }
    $(".alert-danger").css('display', "none"); //警告隱藏
    $("input").click(function (e) { //點擊input隱藏警告
        $(".alert-danger").css('display', "none");
        $(".alert-danger").html("");
    });
    $("a").click(function (e) { //點擊a隱藏警告
        $(".alert-danger").css('display', "none");
        $(".alert-danger").html("");
    });
    $("button").click(function (e) { //點擊button隱藏警告
        $(".alert-danger").css('display', "none");
        $(".alert-danger").html("");
    });
    $("#register").css('display', "none"); //註冊頁隱藏
    $(".login").click(function (e) { //點擊登陸連結
        $(".register").removeClass('active'); //刪除class
        $("#register").css('display', "none"); //註冊頁隱藏
        $(".login").removeClass('active').addClass('active'); //刪除登陸class再增加
        $("#login").css('display', ""); //登陸頁顯示
    });
    $(".register").click(function (e) { //點擊註冊連結
        $(".login").removeClass('active'); //刪除class
        $("#login").css('display', "none"); //註冊頁隱藏
        $(".register").removeClass('active').addClass('active'); //刪除註冊class再增加
        $("#register").css('display', ""); //註冊頁顯示
    });

    $("#register").submit(function (event) { //註冊表單提交
        event.preventDefault();
        let form = $("#register")[0];
        let formData = new FormData(form);
        let email = $("#email_r").val();
        let password = $("#password_r").val();
        let password_check = $("#password_r_check").val();
        let preg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/; //匹配Email 
        let alert_danger = $("#alert_register");
        if (email == "" || !preg.test(email)) {
            alert_danger.css('display', "");
            alert_danger.html("請填寫正確的郵箱！");
        } else if (password == "" || password_check == "") {
            alert_danger.css('display', "");
            alert_danger.html("請記得填寫密碼！");
        } else if (password !== password_check) {
            alert_danger.css('display', "");
            alert_danger.html("密碼二次確認錯誤");
        } else {
            $.ajax({
                url: "./database/index.php",
                method: "POST",
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                success: function (res) {
                    if (res) {
                        Swal.fire({
                            icon: "success",
                            title: "註冊成功",
                            text: "您已經成功註冊帳號",
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: '確定',
                        }).then(function (result) {
                            location.reload();
                        });
                    } else {
                        console.log(res);
                        alert_danger.css('display', "");
                        alert_danger.html("您已經重複註冊囉!");
                    }
                },
                error: function (err) {
                    console.log(err);
                },
            });
        }
    });

    $("#login").submit(function (event) { //註冊表單提交
        event.preventDefault();
        let form = $("#login")[0];
        let formData = new FormData(form);
        let email = $("#email_l").val();
        let password = $("#password_l").val();
        let preg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/; //匹配Email 
        let alert_danger = $("#alert_login");
        if (email == "" || !preg.test(email)) {
            alert_danger.css('display', "");
            alert_danger.html("請填寫正確的郵箱！");
        } else if (password == "") {
            alert_danger.css('display', "");
            alert_danger.html("請記得填寫密碼！");
        } else {
            $.ajax({
                url: "./database/index.php",
                method: "POST",
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                success: function (res) {
                    if (res != false) {
                        Swal.fire({
                            icon: "success",
                            title: "登陸成功",
                            text: "您已經成功登陸帳號",
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: '確定',
                        }).then(function (result) {
                            localStorage.setItem('user', res);
                            location.reload();
                        });
                    } else {
                        alert_danger.css('display', "");
                        alert_danger.html("帳號密碼輸入錯誤!");
                    }
                },
                error: function (err) {
                    console.log(err);
                },
            });
        }
    });
});