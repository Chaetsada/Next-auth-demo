import React from "react";

const Container = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col ">
      {children}
    </div>
  )
};

export default Container;
