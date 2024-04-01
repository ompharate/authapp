import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser} = useSelector((state)=>state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center ">Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.profilePhoto} className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"/>
        <input placeholder="username" defaultValue={currentUser.username} className="bg-slate-100 rounded-lg p-3" type="text" name="username"/>
        <input placeholder="email" defaultValue={currentUser.email}  className="bg-slate-100 rounded-lg p-3" type="text" name="email"/>
        <input placeholder="password" className="bg-slate-100 rounded-lg p-3" type="text" name="password"/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">update</button>
      </form>
      <div className="flex justify-between mt-5">
          <span className="text-red-700">Delete Account</span>
          <span className="text-red-700">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
