import React from "react";
import styles from "./Signup.module.css";
import InputControl from "../InputControl/InputControl";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Signup() {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    pass: "",
  });

  const [msg, setMsg] = React.useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.name || !values.pass) {
      setMsg("Fill all fields");
      return;
    }
    setMsg("");
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        console.log(res);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        setMsg("Account Created..!! Please click on Login");
        setSubmitButtonDisabled(false);
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        if (err.message.includes("email-already-in-use")) {
          setMsg("Email already registered..!! Try another email");
        }
        console.log(err);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>
        <InputControl
          label="Name"
          placeholder="Enter Name"
          onChange={(e) => {
            setValues((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
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
            Sign up
          </button>
          <p>
            Already have an account ?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
