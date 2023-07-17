import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <h1>Home</h1>
      <h2>
        <Link to={"/signup"}>SignUp</Link>
      </h2>
      <h2>
        <Link to={"/login"}>Login</Link>
      </h2>
    </>
  );
}

export default Home;
