import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link, useParams } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function Schedule() {
  const params = useParams();
  const drId = params.drId;
  const token = localStorage.getItem("token");

  const [scheduleId, setScheduleId] = useState("");
  const [isHoliday, setIsHoliday] = useState(false);
  const [modalVisibility, setModalVisibility] = useState("hidden ");
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://psl-test2-b8593d29856b.herokuapp.com/api/v1/doctors/${drId}/schedules`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        // console.log(JSON.parse(result).schedules);
        setSchedules(JSON.parse(result).schedules);
      })
      .catch((error) => console.error(error));
  });

  const handleToggleModal = () => {
    if (modalVisibility === "hidden ") setModalVisibility("");
    else setModalVisibility("hidden ");
  };

  const handleToggleScheduleHoliday = (hol) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      schedule: {
        is_holiday: !hol,
      },
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://psl-test2-b8593d29856b.herokuapp.com/api/v1/doctors/${drId}/schedules/${scheduleId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);

        if (res.status) toast.success(res.message);
        else toast.error("Error: " + res.message + "\n Contact Admin");
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
        <h1 className="text-4xl font-semibold py-6">Schedules</h1>
      </div>
      <div className="mb-24">
        <div className="overflow-x-auto rounded-lg mx-6 my-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-blue-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Schedule_Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Holiday
                </th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, i) => (
                <tr key={i} className="border-t">
                  <td className="px-6 py-4 font-medium text-gray-900 bg-blue-50">
                    <Link to={`${schedule.id}/availabilities`} className="hover:text-blue-600 hover:underline">
                      {schedule.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 bg-blue-50">{schedule.date}</td>
                  <td className="px-6 py-4 bg-blue-50">
                    <button
                      className="hover:text-blue-600 hover:underline"
                      onClick={() => {
                        handleToggleModal();
                        setScheduleId(schedule.id);
                        setIsHoliday(schedule.is_holiday);
                      }}
                    >
                      {schedule.is_holiday ? "yes" : "no"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="create">
          <button
            type="button"
            className="mr-1 ml-6 my-3 px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
          >
            + Add Schedule
          </button>
        </Link>
      </div>
      <div
        id="modal"
        className={
          modalVisibility +
          " overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full duration-300"
        }
      >
        <div className="relative p-4  h-full bg-[rgba(0,0,0,0.3)] w-[100vw]">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow max-w-md">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-lg font-semibold text-gray-900">
                Schedule <br /> {scheduleId}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center border"
                onClick={handleToggleModal}
              >
                <XMarkIcon className="w-3 h-3 text-black"></XMarkIcon>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5">
              <div className="flex">
                <div className="flex items-center h-5">
                  <input
                    id="helper-checkbox"
                    aria-describedby="helper-checkbox-text"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    checked={isHoliday}
                    onChange={(event) => {
                      let hol = isHoliday;
                      handleToggleScheduleHoliday(hol);
                      setIsHoliday(!isHoliday);
                    }}
                  />
                </div>
                <div className="ms-2 text-sm">
                  <label
                    htmlFor="helper-checkbox"
                    className="font-medium text-gray-900"
                  >
                    Holiday
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
