import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function Availabilities() {
  const params = useParams();
  const [modalVisibility, setModalVisibility] = useState("hidden ");
  const schId = params.schId;

  const [availabilities, setAvailabilities] = useState([]);
  const [time, setTime] = useState("");

  const handleToggleModal = () => {
    if (modalVisibility === "hidden ") setModalVisibility("");
    else setModalVisibility("hidden ");
  };

  const handleAddAvailability = () => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      availabilities: {
        time: [time],
        schedule_id: schId,
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/availabilities",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if(res.status) {
            toast.success(res.message);
            handleToggleModal();
        }
        else {
            toast.error(res.message)
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `https://psl-test2-b8593d29856b.herokuapp.com/api/v1/schedules/${schId}/availabilities`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        // console.log(res);
        setAvailabilities(res.schedule.availabilities);
      })
      .catch((error) => console.error(error));
  });

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
        <h1 className="text-4xl font-semibold py-6">Availabilities</h1>
      </div>
      <div className="mb-24">
        <div className="overflow-x-auto rounded-lg mx-6 my-3">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-blue-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Availability_Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Available
                </th>
              </tr>
            </thead>
            <tbody>
              {availabilities.map((availability, i) => (
                <tr key={i} className="border-t">
                  <td className="px-6 py-4 font-medium text-gray-800 bg-blue-50">
                    {availability.time}
                  </td>
                  <td className="px-6 py-4 bg-blue-50">
                    <div>{availability.id}</div>
                  </td>
                  <td className="px-6 py-4 bg-blue-50">
                    {availability.is_available ? "yes" : "no"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="mr-1 ml-6 my-3 px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
          onClick={handleToggleModal}
        >
          + Add Availability
        </button>
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
                Create new Availability
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
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Time (hh:mm am/pm)
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Time"
                    value={time}
                    onChange={(event) => {
                      setTime(event.target.value);
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleAddAvailability}
              >
                <PlusIcon className="me-1 -ms-1 w-5 h-5" />
                Add new
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
