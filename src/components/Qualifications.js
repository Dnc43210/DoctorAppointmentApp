import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function Qualifications() {
  const [qualList, setQualList] = useState([]);
  const [modalVisibility, setModalVisibility] = useState("hidden ");
  const [degree, setDegree] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/qualifications",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => setQualList(JSON.parse(result).qualifications))
      .catch((error) => console.error(error));
  });

  const handleToggleModal = () => {
    if (modalVisibility === "hidden ") setModalVisibility("");
    else setModalVisibility("hidden ");
  };

  const handleAddNewQualification = () => {
    if (degree === "" || description === "") {
      toast.error("Fill all the Details");
    } else {
      const token = localStorage.getItem("token");
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const raw = JSON.stringify({
        qualification: {
          degree: degree,
          description: description,
        },
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/qualifications",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
            if(JSON.parse(result).status)
                toast.success(JSON.parse(result).message);
            else
                toast.error(JSON.parse(result).message);
            setDegree("");
            setDescription("");
            handleToggleModal();
        })
        .catch((error) => console.error(error));
    }
  };
  const handleDegree = (event) => {
    const deg = event.target.value;
    setDegree(deg);
  };

  const handleDescription = (event) => {
    const des = event.target.value;
    setDescription(des);
  };

  return (
    <Layout>
      <div className="p-11">
        <h1 className="text-4xl font-semibold pb-6">Qualifications</h1>
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-blue-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Degree
                </th>
                <th scope="col" className="px-6 py-3">
                  Desciption
                </th>
                <th scope="col" className="px-6 py-3">
                  Created_at
                </th>
                <th scope="col" className="px-6 py-3">
                  updated_at
                </th>
              </tr>
            </thead>
            <tbody>
              {qualList.map((qual, i) => (
                <tr key={i} className="border-t">
                  <td
                    className="px-6 py-4 font-medium text-gray-900 bg-blue-50"
                  >
                    {qual.degree}
                  </td>
                  <td className="px-6 py-4 bg-blue-50">{qual.description}</td>
                  <td className="px-6 py-4 bg-blue-50">{qual.created_at}</td>
                  <td className="px-6 py-4 bg-blue-50">{qual.updated_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="inline-flex items-center mt-3 border p-4 rounded-2xl"
          onClick={handleToggleModal}
          type="button"
        >
          <PlusIcon className="h-6 mr-3" />
          <p> Add New Qualification</p>
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
                Create New Qualification
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
                    Degree
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Type Qualification"
                    value={degree}
                    onChange={handleDegree}
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write description here"
                    value={description}
                    onChange={handleDescription}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleAddNewQualification}
              >
                <PlusIcon className="me-1 -ms-1 w-5 h-5"></PlusIcon>
                Add new
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
