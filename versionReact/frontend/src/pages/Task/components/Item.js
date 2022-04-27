import { useState, useEffect, useRef, Fragment } from "react";
import Swal from "sweetalert2";
import moment from "moment";

const Item = ({ data,userId }) => {
  const [id, setId] = useState(data.id);
  const [title, setTitle] = useState(data.title);
  function titleChange(e) {
    setTitle(e.target.value);
  }
  const [content, setContent] = useState(data.content);
  function contentChange(e) {
    setContent(e.target.value);
  }
  const [schedule, setSchedule] = useState(data.schedule);
  function scheduleChange(e) {
    setSchedule(e.target.value);
  }

  const [editShow, setEditShow] = useState(data.editShow);
  function editShowView() {
    setEditShow(true);
    console.log(data.editShow);
  }
  const [createdAt, setCreatedAt] = useState(data.createdAt);
  const [updatedAt, setUpdatedAt] = useState(
    moment(data.updatedAt).format("YYYY-MM-DD")
  );
  function editTask(event) {
    event.preventDefault();
    const body = {
      id: id,
      userId: userId,
      title: title,
      content: content,
      schedule: schedule,
      editShow: editShow,
    };
    const url = "/task/" + id;
    Swal.fire({
      title: "你確定要更改嗎?",
      text: "按下確定待辦事項會更改內容",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "確定",
      cancelButtonText: "取消 ",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(url, {
          method: "PUT",
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
              title: "編輯成功",
              text: "待辦事項已被編輯",
              confirmButtonColor: "#3085d6",
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
      setEditShow(false);
    });
  }

  function deleteTask(event) {
    console.log(id, userId);
    event.preventDefault();
    const body = {
      id: id,
      userId: userId,
    };
    const url = "/task/" + id;
    Swal.fire({
      title: "你確定要刪除嗎?",
      text: "按下確定待辦事項會永久刪除",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "確定",
      cancelButtonText: "取消 ",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((res) => res.text()) /*把request json化*/
          .then((response) => {
            console.log(response);
            Swal.fire({
              icon: "error",
              title: "刪除成功",
              text: "待辦事項已被刪除",
              confirmButtonColor: "#3085d6",
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
      setEditShow(false);
    });
  }

  return (
    <div className="col-12 col-lg-6">
      <div className="card">
        <div className="card-body">
          {/*標題/start*/}
          {editShow === true ? (
            <div className="input-group input-group-lg mb-3">
              <input value={title} onChange={titleChange} type="text" />
            </div>
          ) : (
            <h4 className="card-title">
              <strong>{title}</strong>
            </h4>
          )}
          {/*標題/end */}
          {/*內容/start*/}
          {editShow === true ? (
            <div className="input-group input-group-lg mb-3">
              <textarea
                value={content}
                onChange={contentChange}
                rows="3"
              ></textarea>
            </div>
          ) : (
            <p className="card-text">{content}</p>
          )}
          {/*內容/end */}

          {editShow === true ? (
            <Fragment>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="未完成"
                  onChange={scheduleChange}
                  checked={schedule == "未完成"}
                />
                <label className="form-check-label">未完成</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="已完成"
                  onChange={scheduleChange}
                  checked={schedule == "已完成"}
                />
                <label className="form-check-label">已完成</label>
              </div>
            </Fragment>
          ) : (
            <Fragment></Fragment>
          )}

          {/* 日期/start */}
          <div className="d-flex justify-content-between">
            <span className="d-block text-secondary mt-4 icon datetime">
              {updatedAt}
            </span>
            {schedule === "未完成" ? (
              <i className="fas fa-times d-block text-danger text-success ml-2 mt-4">
                未完成
              </i>
            ) : (
              <i className="fas fa-check d-block text-secondary text-success ml-2 mt-4">
                已完成
              </i>
            )}
          </div>
          {/* 日期/end  */}
          {/* 編輯&刪除/start  */}
          <div className="d-flex justify-content-center">
            {editShow == true ? (
              <button
                type="button"
                className="btn btn-link card_button"
                name="exit_success"
                onClick={editTask}
              >
                <i className="far fa-check-square fa-2x text-success"></i>
              </button>
            ) : (
              <Fragment>
                <button
                  type="button"
                  className="btn btn-link card_button"
                  name="edit"
                  onClick={editShowView}
                >
                  <i className="fas fa-edit fa-2x text-warning"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-link card_button"
                  name="delete"
                  onClick={deleteTask}
                >
                  <i
                    className="fas fa-trash-alt fa-2x text-danger"
                    name="delete"
                  ></i>
                </button>
              </Fragment>
            )}
          </div>
          {/*  編輯&刪除/end */}
        </div>
      </div>
    </div>
  );
};

export default Item;
