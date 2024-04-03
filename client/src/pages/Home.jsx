import React from "react";
import { useSelector } from "react-redux";  
const Home = () => {
  const { email,_id } = useSelector((state) => state.user.currentUser);
  return (  
    <div>
      <h1 className="text-red-700">{_id}</h1>
  
    </div>
  );
};

export default Home;
