import { useState, useEffect, useRef, Fragment } from "react";
import Swal from "sweetalert2";

const Register = () => {
  const [email, setEmail] = useState("");
  function emailChange(e) {
    setEmail(e.target.value);
  }

  const [password, setPassword] = useState("");
  function passwordChange(e) {
    setPassword(e.target.value);
  }

  const [passwordCheck, setPasswordCheck] = useState("");
  function passwordCheckChange(e) {
    setPasswordCheck(e.target.value);
  }

  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  function showAlertChange(e) {
    setShowAlert(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (password != passwordCheck) {
      setShowAlert(true);
      setAlert("確認密碼輸入錯誤");
      return false;
    }
    const body = {
      email: email,
      password: password,
      passwordCheck: passwordCheck,
    };
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.text()) /*把request json化*/
      .then((response) => {
        console.log(response);
        if (response == "True") {
          Swal.fire({
            icon: "success",
            title: "註冊成功",
            text: "您已經成功註冊帳號",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "確定",
          }).then(function () {
            console.log(response);
            window.location = "/"
          });
        } else {
          setShowAlert(true);
          setAlert("該信箱已經註冊");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <form id="register" onSubmit={handleSubmit}>
        <input
          required
          type="email"
          name="email_r"
          id="email_r"
          className="form-control border-dark"
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
        <input
          required
          type="password"
          className="form-control border-dark mt-3"
          placeholder="密碼確認"
          onChange={passwordCheckChange}
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
          Signup
        </button>
      </form>
    </div>
  );
};

export default Register;
