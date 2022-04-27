import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import SideBar from "./components/SideBar";
import Item from "./components/Item";

async function fetchData(setDatas, userId) {
  const body = {
    userId: userId,
  };
  const response = await fetch("/tasks", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  setDatas(data);
}

const Task = () => {
  const [datas, setDatas] = useState([]);
  const par = useParams();
  let user, userId;
  if (localStorage.getItem("user") === null) {
    window.location = "/";
  } else {
    user = JSON.parse(localStorage.getItem("user"));
    userId = user[0].id;
  }
  useEffect(() => {
    fetchData(setDatas, userId);
  }, []);

  useEffect(() => {
    // 使用瀏覽器 API 更新文件標題
    document.title = "待辦事項";
  });

  return (
    <section className="container mt-3" id="to-do-list">
      <div className="row">
        <header className="col-12">
          <h2>
            <i className="fas fa-tasks">待辦事項</i>
          </h2>
          <hr className="pr-5" />
        </header>
        <div className="col-12 col-md-8">
          <div className="row">
            {datas.map((data) => {
              const { id } = data;
              if (par.schedule != undefined) {
                if (par.schedule === "finish" && data.schedule === "已完成")
                  return <Item key={id} userId={userId} data={data} />;
                else if (par.schedule === "undone" && data.schedule === "未完成")
                  return <Item key={id} userId={userId} data={data} />;
              } else {
                return <Item key={id} userId={userId} data={data} />;
              }
            })}
          </div>
        </div>
        <SideBar datas={datas} userId={userId} fetchData={fetchData} />
      </div>
    </section>
  );
};

export default Task;
