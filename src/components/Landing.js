import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="absolute w-full h-full">
      <img
        src="https://img.freepik.com/free-photo/abstract-blur-shopping-mall_74190-4926.jpg?t=st=1710832532~exp=1710836132~hmac=472bacff5583fdd8e10a7a6b8f12fc48d21dfe3ca009db9b73add91c3162d96d&w=740"
        alt="blurred pharmacy"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <h1 className="text-[5vw] font-bold text-wrap align-center">
          Doctor Appointment
          <Link className="ml-10 bg-orange-500 py-4 px-10 rounded-lg font-bold text-[2vw] hover:bg-blue-500 transition duration-500" to="/login">Login</Link>
        </h1>
        
      </div>
    </div>
  );
}
