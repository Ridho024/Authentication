import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className="title has-text-black">Dashboard</h1>
      <h2 className="subtitle has-text-dark">Welcome bro {user && user.name}</h2>
    </div>
  );
};

export default Welcome;
