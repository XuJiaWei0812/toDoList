import {
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./index.css";
import Login from "./components/Login";
import Register from "./components/Register";

const User = () => {

  return (
    <section className="container d-flex justify-content-center p-5">
        <div className="userCard card p-3 mt-5">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <NavLink
                  className={(navData) =>
                    navData.isActive ? "nav-link active" : "nav-link"
                  }
                  to="/"
                >
                  帳號登陸
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={(navData) =>
                    navData.isActive ? "nav-link active" : "nav-link"
                  }
                  to="/register"
                >
                  帳號註冊
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </div>
          <div className="card-footer text-muted text-center">
            版權所有© 2021 Awu
          </div>
        </div>
    </section>
  );
};

export default User;
