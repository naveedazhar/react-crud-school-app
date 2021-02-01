import React from "react";

const Home = ({ name }) => {
  return (
    <h1 className="center">
      Welcome, {name ? name : "Please signin to explore..."}
    </h1>
  );
};

export default Home;
