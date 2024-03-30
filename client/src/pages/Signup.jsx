import React from "react";
import { Link } from "react-router-dom";
function Signup() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
      <form className="flex flex-col gap-4">
        <input
          className="bg-slate-100 p-3"
          type="text"
          placeholder="Username"
          name="username"
        />
        <input
          className="bg-slate-100 p-3"
          type="email"
          placeholder="Email"
          name="email"
        />
        <input
          className="bg-slate-100 p-3"
          type="password"
          placeholder="Password"
          name="password"
        />
        <button className="bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-80 font-bold">
          Sign up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
