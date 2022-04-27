import React, { useState, Fragment } from "react";
import Swal from "sweetalert2";

const AddItem = ({userId}) => {
  const [title, setTitle] = useState("");
  function titleChange(e) {
    setTitle(e.target.value);
  }

  const [content, setContent] = useState("");
  function contentChange(e) {
    setContent(e.target.value);
  }

  function addTask(event) {
    event.preventDefault();
    console.log(userId)
    const body = {
      userId: userId,
      title: title,
      content: content,
    };
    const url = "/task";
    Swal.fire({
      title: "你確定要新增嗎?",
      text: "按下確定會新增待辦事項",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "確定",
      cancelButtonText: "取消 ",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((res) => res.text()) /*把request json化*/
          .then((response) => {
            console.log(response);
            Swal.fire({
              icon: "success",
              title: "新增成功",
              text: "您已經成功新增事項",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "確定",
            }).then(function () {
              console.log(response);
              window.location.reload();
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  return (
    <form id="add_task" onSubmit={addTask}>
      <div className="modal-body">
        <div className="form-group">
          <input
            required
            type="text"
            className="form-control my-3"
            placeholder="輸入事項標題"
            value={title}
            onChange={titleChange}
          />
        </div>
        <div className="form-group">
          <textarea
            required
            className="form-control"
            rows="3"
            placeholder="輸入事項內容"
            value={content}
            onChange={contentChange}
          ></textarea>
        </div>
      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-primary">
          新增
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          取消
        </button>
      </div>
    </form>
  );
};

export default AddItem;
