import React, { useState } from "react";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function CreateSchedule() {
  const params = useParams();
  const drId = params.drId;

  const [timings, setTimings] = useState([""]);
  const [day, setDay] = useState("sunday");

  const handleDayChange = (event) => {
    const dayOfWeek = event.target.value;
    setDay(dayOfWeek);
  };

  const handleSubmitSchedule = () => {
    console.log(timings);
    console.log(day);
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      schedule: {
        doctor: drId,
        days: [
          {
            day: day,
            time: [...timings],
          },
        ],
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/schedules",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = (JSON.parse(result));
        if(res.status)
        {
            toast.success(res.message);
        }
        else
        {
            toast.error(res.message+"\n You are not Allowed to do this")
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <Layout>
      <div className="mt-8 px-6">
        <button
          type="button"
          className="mr-1 px-6 py-3.5 text-base font-medium text-gray-800 bg-gray-100 hover:bg-white rounded-lg text-center border"
          onClick={() => {
            window.history.back();
          }}
        >
          Back
        </button>
        <h1 className="text-4xl font-semibold py-6">Create Schedule</h1>
      </div>
      <div className="max-w-sm mx-auto my-6">
        <div className="mb-5">
          <label
            htmlFor="id"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Doctor ID
          </label>
          <div
            id="id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            {drId}
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="day"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select a Day
          </label>
          <select
            id="day"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={handleDayChange}
          >
            {/* <option selected></option> */}
            <option value="sunday">Sunday</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
          </select>
        </div>
        <div className="mb-5">
          <div className="mb-2">
            <label
              htmlFor="timing"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Timings
            </label>
            {timings.map((timing, i) => (
              <div className="inline-flex w-full mb-2" key={i}>
                <input
                  type="text"
                  key={i}
                  id="id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 "
                  value={timing}
                  onChange={(event) => {
                    const timeArray = [...timings];
                    timeArray[i] = event.target.value;
                    setTimings(timeArray);
                  }}
                />
                <button
                  className="w-[15%] ml-[5%] border rounded-lg bg-red-400 text-white hover:bg-red-500"
                  onClick={() => {
                    if (timings.length > 1) {
                      const newTimings = timings.filter(
                        (_, index) => index !== i
                      );
                      setTimings(newTimings);
                    }
                  }}
                >
                  <XMarkIcon className="h-4 m-auto" />
                </button>
              </div>
            ))}
          </div>
          <button
            className="w-full border rounded-lg bg-gray-100 text-gray-800 p-2.5 hover:bg-blue-300"
            onClick={() => {
              setTimings([...timings, ""]);
            }}
          >
            <PlusIcon className="h-4 m-auto" />
          </button>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmitSchedule}
        >
          Submit
        </button>
      </div>
    </Layout>
  );
}
