import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OAuth } from "../componentes/OAuth";
function Signup() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigation("/sign-in")
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="bg-slate-100 p-3"
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          className="bg-slate-100 p-3"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          className="bg-slate-100 p-3"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-80 font-bold"
        >
          {loading ? "loading" : "Sign up"}
        </button>
        <OAuth/> 
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700">{error && "something went wrong"}</p>
    </div>
  );
}

export default Signup;
