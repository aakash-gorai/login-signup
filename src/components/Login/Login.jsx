import React from "react";
import styles from "./Login.module.css";
import InputControl from "../InputControl/InputControl";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";

function Login() {
  const [values, setValues] = React.useState({
    email: "",
    pass: "",
  });
  const [msg, setMsg] = React.useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setMsg("Fill all fields");
      return;
    }
    setMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then((res) => {
        console.log(res);
        setSubmitButtonDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        if (err.message.includes("user-not-found")) {
          setMsg("Please Create Account First..!!");
        }
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>
        <InputControl
          label="Email"
          placeholder="Enter Email"
          onChange={(e) => {
            setValues((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <InputControl
          label="Password"
          placeholder="Enter Password"
          onChange={(e) => {
            setValues((prev) => ({ ...prev, pass: e.target.value }));
          }}
        />
        <div className={styles.footer}>
          <b className={styles.error}>{msg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Log in
          </button>
          <p>
            Don't have an account ?{" "}
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
