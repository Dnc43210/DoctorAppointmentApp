import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

function Doctors() {
  const [docList, setDocList] = useState([]);
  const [modalVisibility, setModalVisibility] = useState("hidden ");
  const [newDoctor, setNewDoctor] = useState({
    first_name: "",
    password: "",
    password_confirmation: "",
    last_name: "",
    email: "",
    contact_number: "",
  });

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
      "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/doctors",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setDocList(JSON.parse(result).doctors);
      })
      .catch((error) => console.error(error));
  });

  const handleAddNewdoctor = () => {
    // console.log("body", newDoctor);
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      doctor: newDoctor,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/doctor",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.status) toast.success(res.message);
        else toast.error(res.message);
        handleToggleModal();
      })
      .catch((error) => console.error(error));
  };

  const handleToggleModal = () => {
    if (modalVisibility === "hidden ") setModalVisibility("");
    else setModalVisibility("hidden ");
  };

  return (
    <Layout>
      <div className="p-11 my-16">
        <h1 className="text-4xl font-semibold pb-6">Doctors</h1>
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-blue-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {docList.map((doc, i) => (
                <tr key={i} className="border-t">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 bg-blue-50"
                  >
                    {doc.first_name + " " + doc.last_name}
                  </td>
                  <td className="px-6 py-4 bg-blue-50">{doc.email}</td>
                  <td className="px-6 py-4 bg-blue-50">{doc.contact_number}</td>
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
          <p> Register New</p>
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
                Register New Doctor
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
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="First Name"
                    value={newDoctor.first_name}
                    onChange={(e) => {
                      setNewDoctor({
                        ...newDoctor,
                        first_name: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Password"
                    value={newDoctor.password}
                    onChange={(e) => {
                      setNewDoctor({
                        ...newDoctor,
                        password: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Confirm Password"
                    value={newDoctor.password_confirmation}
                    onChange={(e) => {
                      setNewDoctor({
                        ...newDoctor,
                        password_confirmation: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Last Name"
                    value={newDoctor.last_name}
                    onChange={(e) => {
                      setNewDoctor({
                        ...newDoctor,
                        last_name: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Email"
                    value={newDoctor.email}
                    onChange={(e) => {
                      setNewDoctor({
                        ...newDoctor,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Contact Number"
                    value={newDoctor.contact_number}
                    onChange={(e) => {
                      setNewDoctor({
                        ...newDoctor,
                        contact_number: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleAddNewdoctor}
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

export default Doctors;
