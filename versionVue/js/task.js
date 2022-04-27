const app = new Vue({
    el: '#to-do-list',
    data: {
        user: null,
        title: null,
        content: null,
        date: null,
        storageArray: [],
        all_count: 0,
        complete_count: 0,
        undone_count: 0,
        schedule: "所有"
    },
    created: function () {
        if (localStorage.getItem('user') === null) {
            location.replace('index.html');
        } else {
            user = JSON.parse(localStorage.getItem('user'));
        }
    },
    mounted() {
        this.get_task();
    },
    methods: {
        get_task: function () {
            let data = this;
            $.ajax({
                url: "./database/task.php",
                method: "post",
                dataType: "json",
                data: {
                    'get_task': true,
                    'user_id': user.id,
                },
                success: function (res) {
                    data.complete_count = 0;
                    data.undone_count = 0;
                    data.storageArray = res;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].schedule == "已完成") {
                            data.complete_count++;
                        } else if (res[i].schedule == "未完成") {
                            data.undone_count++;
                        }
                        data.all_count++;
                    }
                },
                error: function (err) {
                    console.log(err)
                },
            });
        },
        add_task: function (e) {
            let data = this;
            e.preventDefault();
            if (this.title && this.content) {
                Swal.fire({
                    title: '你確定要新增嗎?',
                    text: '按下確定會新增待辦事項',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '確定',
                    cancelButtonText: "取消 ",
                }).then((result) => {
                    if (result.isConfirmed) {
                        let form = $("#add_task")[0];
                        let formData = new FormData(form);
                        formData.append("user_id", user.id);
                        formData.append("add_task", true);
                        $.ajax({
                            url: "./database/task.php",
                            method: "POST",
                            data: formData,
                            contentType: false,
                            cache: false,
                            processData: false,
                            success: function (res) {
                                Swal.fire({
                                    icon: "success",
                                    title: "新增成功",
                                    text: "您已經成功新增事項",
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: '確定',
                                }).then(function (result) {
                                    location.reload();
                                });
                            },
                            error: function (err) {
                                console.log(err);
                            },
                        });
                    }
                })
            }
        },
        edit_show: function (id) {
            this.storageArray[id].editshow = true;
        },
        edit_task: function (id) {
            let data = this;
            Swal.fire({
                title: '你確定要更改嗎?',
                text: '按下確定待辦事項會更改內容',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '確定',
                cancelButtonText: "取消 ",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: "./database/task.php",
                        method: "post",
                        dataType: "json",
                        data: {
                            'edit_task': true,
                            'id': data.storageArray[id].id,
                            'title': data.storageArray[id].title,
                            'content': data.storageArray[id].content,
                            'schedule': data.storageArray[id].schedule,
                        },
                        success: function (res) {
                            if (res) {
                                Swal.fire({
                                    title: '編輯成功',
                                    text: '待辦事項已被編輯',
                                    icon: 'success',
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: '確定',
                                }).then(function () {
                                    location.reload();
                                });
                            }
                        },
                        error: function (err) {
                            console.log(err);
                        },
                    });
                }
                this.storageArray[id].editshow = false;
            });
        },
        delete_task: function (id) {
            let data = this;
            Swal.fire({
                title: '你確定要刪除嗎?',
                text: '按下確定待辦事項會永久刪除',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '確定',
                cancelButtonText: "取消 ",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: "./database/task.php",
                        method: "post",
                        dataType: "json",
                        data: {
                            'delete_task': true,
                            'id': data.storageArray[id].id,
                        },
                        success: function (res) {
                            if (res) {
                                Swal.fire({
                                    title: '刪除成功',
                                    text: '待辦事項已被刪除',
                                    icon: 'error',
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: '確定',
                                }).then(function () {
                                    location.reload();
                                });
                            }
                        },
                        error: function (err) {
                            console.log(err)
                        },
                    });
                }
            })
        },
        get_task_type: function (e) { //分類顯示方法
            let complete_show = $("div[name=已完成]");
            let undone_show = $("div[name=未完成]");
            if (e == "所有") { //點所有分類
                complete_show.removeClass("d-none");
                undone_show.removeClass("d-none");
                this.schedule = "所有";
            } else {
                if (e == "已完成") { //點擊已完成分類
                    complete_show.removeClass("d-none"); //已完成的顯示
                    undone_show.addClass("d-none"); //未完成的隱藏
                    this.schedule = "已完成";
                } else if (e == "未完成") { //點擊未完成分類
                    undone_show.removeClass("d-none"); //未完成的顯示
                    complete_show.addClass("d-none"); //已完成的隱藏
                    this.schedule = "未完成";
                }
            }
        },
        clear_storage: function () {
            Swal.fire({
                title: '你確定要登出嗎?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '確定',
                cancelButtonText: "取消 ",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: "success",
                        title: "登出成功",
                        text: "您已經成功登出帳號",
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: '確定',
                    }).then(function () {
                        window.localStorage.clear();
                        location.replace('index.html');
                    });
                }
            })
        },
    }
})