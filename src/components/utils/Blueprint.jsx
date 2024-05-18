import React from "react";

const Blueprint = ({ color, content1, content2, content3 }) => {
  return (
    <div
      style={color}
      className={`w-screen h-screen text-white flex flex-col md:flex-row`}
    >
      <div className="md:w-[20%]">{content1}</div>
      <div className="md:w-[30%] hidden md:block">{content2}</div>
      <div className="md:w-[50%]">{content3}</div>
    </div>
  );
};

export default Blueprint;
