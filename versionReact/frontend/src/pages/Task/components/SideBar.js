import { useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import AddItem from "./AddItem";
import moment from "moment";
import Swal from "sweetalert2";

const SideBar = ({ datas, userId }) => {
  const [allCount, setAllCount] = useState(0);
  const [undoneCount, setUndoneCount] = useState(0);
  const [finishCount, setFinishCount] = useState(0);
  const [Str, setStr] = useState("");
  function count() {
    datas.map(function (item, i) {
      if (item.schedule === "未完成") {
        setUndoneCount((prevstate) => prevstate + 1);
      } else {
        setFinishCount((prevstate) => prevstate + 1);
      }
    });
    setAllCount(datas.length);
  }
  function addStr() {
    datas.map(function (item, i) {
      if (item.schedule === "未完成") {
        setStr(
          Str +
            `<li key=${item.id} className="media mb-3">
        <div className="media-body">
          <div className="mt-0 mb-1 text-truncate">${item.title}</div>
          <span className="d-block mt-1 text-secondary icon datetime">
            ${moment(item.updatedAt).format("YYYY-MM-DD")}
          </span>
        </div>
      </li>`
        );
      }
    });
  }
  function clearStorage() {
    Swal.fire({
      title: "你確定要登出嗎?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "確定",
      cancelButtonText: "取消 ",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "登出成功",
          text: "您已經成功登出帳號",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "確定",
        }).then(function () {
          window.localStorage.clear();
          window.location = "/"
        });
      }
    });
  }
  useEffect(() => {
    count();
    addStr();
  }, [datas]);

  return (
    <div className="col-12 col-md-4">
      <div className="bg-white p-3 mb-3 border rounded left-show">
        <button
          id="sign_out"
          type="button"
          className="btn btn-lg btn-block bg-danger"
          onClick={clearStorage}
        >
          <strong>
            <i className="fas fa-sign-out-alt"></i> 會員登出
          </strong>
        </button>
      </div>
      <div className="bg-white p-3 mb-3 border rounded left-show">
        <button
          id="add_button"
          type="button"
          className="btn btn-lg btn-block"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <strong>✚ 新增事項</strong>
        </button>
      </div>
      {/* 新增事項視窗(FROM)! */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                新增事項
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <AddItem userId={userId}></AddItem>
          </div>
        </div>
      </div>
      {/* 新增事項/end */}
      {/* 未完成事項/start */}
      <div className="bg-white p-3 mb-3 border rounded left-show">
        <h5 className="mb-3">
          <strong>未完成事項</strong>
        </h5>
        <ul className="list-category">
          {datas.map(function (item, i) {
            if (item.schedule === "未完成") {
              return (
                <li key={item.id} className="media mb-3">
                  <div className="media-body">
                    <div className="mt-0 mb-1 text-truncate">{item.title}</div>
                    <span className="d-block mt-1 text-secondary icon datetime">
                      {moment(item.updatedAt).format("YYYY-MM-DD")}
                    </span>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
      {/* 未完成事項/end */}
      {/* 事項分類/start */}
      <div className="bg-white p-3 mb-3 border rounded left-show">
        <h5 className="mb-3">
          <strong>分類</strong>
        </h5>
        <ul className="list-category category">
          <li>
            <NavLink to="/task">
              所有
              <span className="badge badge-pill badge-secondary ml-2">
                {allCount}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/task/finish">
              已完成
              <span className="badge badge-pill badge-secondary ml-2">
                {finishCount}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/task/undone">
              未完成
              <span className="badge badge-pill badge-secondary ml-2">
                {undoneCount}
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* 事項分類/end */}
    </div>
  );
};

export default SideBar;
