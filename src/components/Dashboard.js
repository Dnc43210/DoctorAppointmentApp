import React from "react";
import Layout from "./Layout";
export default function Dashboard() {
  let ListData = [
    {
      image:
        "https://thumbs.dreamstime.com/b/smiling-female-doctor-holding-medical-records-lab-coat-her-office-clipboard-looking-camera-56673035.jpg",
      title: "doctors",
      description: "Get a list of all the doctors present",
      href: "/doctors",
    },

    {
      image:
        "https://t3.ftcdn.net/jpg/02/60/79/68/360_F_260796882_QyjDubhDDk0RZXV9z7XBEw9AKnWCizXy.jpg",
      title: "Schedules",
      description: "Get a list of all the appointments",
      href: "appointments",
    },
  ];
  return (
    localStorage.getItem("token") && <Layout>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {ListData.map((item, i) => (
          <div
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow mx-auto my-6 lg:m-6"
            key={i}
          >
            <a href="/" >
              <img className="rounded-t-lg h-56 w-full object-cover" src={item.image} alt="" />
            </a>
            <div className="p-5">
              <a href="/">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 capitalize">
                  {item.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700">{item.description}</p>
              <a
                href="/"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
              >
                View List
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
