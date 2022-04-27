import { useState, useEffect, useRef, Fragment } from "react";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  function emailChange(e) {
    setEmail(e.target.value);
  }

  const [password, setPassword] = useState("");
  function passwordChange(e) {
    setPassword(e.target.value);
  }

  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  function showAlertChange(e) {
    setShowAlert(false);
  }

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      window.location = "/task"
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const body = {
      email: email,
      password: password,
    };

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json()) /*把request json化*/
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "登陸成功",
          text: "您已經成功登陸帳號",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "確定",
        }).then(function () {
          localStorage.setItem("user", JSON.stringify(response));
          console.log(response);
          window.location = "/task"
        });
      })
      .catch((error) => {
        setShowAlert(true);
        setAlert("帳號密碼錯誤");
        console.log(error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="email"
          className="form-control border border-dark"
          placeholder="信箱"
          onChange={emailChange}
          onClick={showAlertChange}
        />
        <input
          required
          type="password"
          className="form-control border-dark mt-3"
          placeholder="密碼"
          onChange={passwordChange}
          onClick={showAlertChange}
        />
        {showAlert === true ? (
          <div
            className="alert alert-danger mt-3"
            id="alert_login"
            role="alert"
          >
            {alert}
          </div>
        ) : (
          <Fragment></Fragment>
        )}

        <button type="submit" className="btn btn-dark btn-block mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
