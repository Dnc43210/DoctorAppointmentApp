import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [docId, setDocId] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [schId, setSchId] = useState("");
  const [availabilities, setAvailabilities] = useState([]);
  const [availabilityId, setAvailabilityId] = useState("");

  const getSchedules = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://psl-test2-b8593d29856b.herokuapp.com/api/v1/doctors/${docId}/schedules`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        setSchedules(res.schedules);
      })
      .catch((error) => console.error(error));
  };

  const getAvailabilities = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:3000/api/v1/schedules/${schId}/availabilities`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        setAvailabilities(res.schedule.availabilities);
      })
      .catch((error) => console.log("error", error));
  };

  const handleBookAppointment = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      appointment: {
        doctor_id: docId,
        schedule_id: schId,
        availability_id: availabilityId,
      },
    });

    console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/appointments",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.status) {
          toast.success(res.message);
        } else toast.error(res.message);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      mode: "no-cors",
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/doctors",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        setDoctors(res.doctors);
      })
      .catch((error) => console.error(error));
  });

  return (
    <div>
    <h1 className="mx-10 font-medium text-3xl mt-10">Welcome Patient</h1>
      <div className="p-4 w-full max-h-full overflow grid grid-cols-1 sm:grid-cols-2">
        {/* DOCTOR SELECT */}
        <div className="bg-white rounded-lg shadow-lg m-6 max-w-md">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Select Doctor
            </h3>
          </div>
          <div className="p-4 md:p-5">
            <form className="max-w-sm mx-auto">
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(event) => {
                  setDocId(event.target.value);
                }}
              >
                <option>Choose a Doctor</option>
                {doctors.map((doc) => (
                  <option value={doc.id}>
                    {doc.first_name + " " + doc.last_name}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </div>

        {/* SCHEDULE SELECT */}
        {docId !== "" && (
          <div className="bg-white rounded-lg shadow-lg m-6 max-w-md">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Select Schedule
              </h3>
            </div>
            <div className="p-4 md:p-5">
              <form className="max-w-sm mx-auto">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(event) => {
                    setSchId(event.target.value);
                    getAvailabilities();
                  }}
                >
                  <option>Choose a schedule</option>
                  {schedules.map((sch) => (
                    <option value={sch.id}>{sch.date}</option>
                  ))}
                </select>
              </form>
            </div>
          </div>
        )}

        {/* AVAILABILITY SELECT */}
        {schId !== "" && (
          <div className="bg-white rounded-lg shadow m-6 max-w-md">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Select Availability
              </h3>
            </div>
            <div className="p-4 md:p-5">
              <form className="max-w-sm mx-auto">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(event) => {
                    setAvailabilityId(event.target.value);
                  }}
                >
                  <option>Choose an Availability</option>
                  {availabilities.map((avail) => (
                    <option
                      value={avail.id}
                      className={
                        avail.is_available ? "bg-green-200" : "bg-red-200"
                      }
                    >
                      {avail.time}
                    </option>
                  ))}
                </select>
              </form>
            </div>
          </div>
        )}

        {docId !== "" && schId !== "" && availabilityId !== "" && (
          <button
            className="border rounded-lg bg-blue-400 text-gray-800 p-2.5 hover:bg-blue-300 m-6 max-h-16 inline-flex max-w-md"
            onClick={handleBookAppointment}
          >
            <div className="m-auto">
              <PlusIcon className="h-4 w-4 m-auto" />
              book an appointment
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
