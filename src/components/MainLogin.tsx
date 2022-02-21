import React, { FormEvent, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
export interface ILoginData {
  email: string;
  password: string;
}
export const MainLogin: React.FC = () => {
  const [registerActive, setRegisterActive] = useState<boolean>(false);
  const [dataLogin, setDataLogin] = useState<ILoginData>({
    email: "",
    password: "",
  });
  const [err, setErr] = useState<string>("");
  const navigate = useNavigate();
  const changeHandlerRegister = () => {
    if (registerActive) {
      setRegisterActive(false);
      return;
    }
    setRegisterActive(true);
  };
  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    const name: string = e.currentTarget.name;
    const val: string = e.currentTarget.value;
    setDataLogin((prev) => ({
      ...prev,
      [name]: val,
    }));
  };
  useEffect(() => {
    const localData = localStorage.getItem("auth");
    if (localData === "true") {
      navigate("/cabinet");
      return;
    }
  }, [navigate]);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();
    if (registerActive) {
      createUserWithEmailAndPassword(auth, dataLogin.email, dataLogin.password)
        .then((res) => {
          navigate("/cabinet");
          localStorage.setItem("auth", "true");
        })
        .catch((error) => {
          const errorCode = error.code;

          const replaceCode = errorCode.replace("auth/", "");
          localStorage.removeItem("auth");
          switch (replaceCode) {
            case "email-already-in-use":
              setErr("Email already in use");
              break;
            case "invalid-email":
              setErr("Invalid email");
              break;
          }
        });
      return;
    }
    signInWithEmailAndPassword(auth, dataLogin.email, dataLogin.password)
      .then((res) => {
        navigate("/cabinet");
        localStorage.setItem("auth", "true");
      })
      .catch((error) => {
        const replaceCode = error.code.replace("auth/", "");
        localStorage.removeItem("auth");
        switch (replaceCode) {
          case "invalid-email":
            setErr("Invalid email");
            break;
          case "wrong-password":
            setErr("Wrong password");
            break;
          case "user-not-found":
            setErr("User not found");
        }
      });
  };

  return (
    <div className="main-login-wrapper">
      <div className="container-form">
        <form className="main-form-wrapper" onSubmit={submitHandler}>
          <h1 className="h1">{registerActive ? "Sign up" : "Sign in"}</h1>
          <p className="err-wrapper">{err !== "" ? err : ""}</p>
          <div className="input-wrapper">
            <input
              type="text"
              onChange={changeHandler}
              name="email"
              placeholder="E-mail"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              onChange={changeHandler}
              name="password"
              placeholder="Password"
            />
          </div>
          <button>
            <span>{registerActive ? "Sign up" : "Sign in"}</span>
          </button>
          <span className="link-register" onClick={changeHandlerRegister}>
            {registerActive
              ? "Have an account, please sign in"
              : "Don't have an account? Register now"}
          </span>
        </form>
      </div>
    </div>
  );
};
