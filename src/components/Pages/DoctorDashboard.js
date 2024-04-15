import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DoctorDashboard() {
    const [appointments, setAppoinements] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/doctor/appointments",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if(res.status){
            setAppoinements(res.appointments)
        }
        else
        {
            toast.error(res.message);
        }
      })
      .catch((error) => console.error(error));
  });
  return (
    <div>
      <h1 className="mx-10 font-medium text-3xl mt-10">Welcome Doctor</h1>
      {JSON.stringify(appointments)}
    </div>
  );
}
