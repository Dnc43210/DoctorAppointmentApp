import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link, useParams } from "react-router-dom";

export default function Availabilities() {
  const params = useParams();
  const schId = params.schId;

  const [availabilities, setAvailabilities] = useState([]);

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
        console.log(res);
        setAvailabilities(res.schedule.availabilities)
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
                <td className="px-6 py-4 font-medium text-gray-800 bg-blue-50">{availability.time}</td>
                  <td className="px-6 py-4 bg-blue-50">
                    <div>
                      {availability.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 bg-blue-50">
                    <button
                      className="hover:text-blue-600 hover:underline"
                      onClick={() => {
                        // handleToggleModal();
                        // setScheduleId(schedule.id);
                        // setIsHoliday(schedule.is_holiday);
                      }}
                    >
                      {availability.is_available ? "yes" : "no"}
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
    </Layout>
  );
}
