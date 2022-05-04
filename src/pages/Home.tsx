import React from "react";

const Home = () => {
  const value = React.useContext(UserContext);

  return <h1>Home{value}</h1>;
};

export default Home;
