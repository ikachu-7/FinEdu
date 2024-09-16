import React from "react";

const Card = (props) => {
  return (
    <div className="bg-[#3c4043] rounded-xl flex items-center justify-center h-full">
      {props.children}
    </div>
  );
};

export default Card;
