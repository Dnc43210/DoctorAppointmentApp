import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const roleTypes = ["admin", "doctor", "patient"];

  const handleDataLogin = () => {
    let data = userData;
    if (data.email !== "" && data.password !== "" && data.role !== "") {
      if (data.role === "patient") {
        delete data.role;
      }
      // console.log(JSON.stringify(data));
      handleLogin(data);
    }
    else
    {
        toast.error("please fill all details")
    }
  };

  const handleLogin = (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user: data,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://psl-test2-b8593d29856b.herokuapp.com/api/v1/session",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        // console.log(res)
        if(res.status)
        {
            toast.success("Logged in")
            localStorage.setItem("token", res.user.authentication.token);
            localStorage.setItem("userType", userData.role);
            navigate("/dashboard")
        }
        else
        toast.error(res.message)
      })
      .catch((error) => console.error(error));
  };

  const handleRoleSelect = (event) => {
    const userRole = event.target.value;
    let data = userData;
    data.role = userRole;
    setUserData(data);
  };
  const handleEmail = (event) => {
    const userEmail = event.target.value;
    let data = userData;
    data.email = userEmail;
    setUserData(data);
  };
  const handlePass = (event) => {
    const userPass = event.target.value;
    let data = userData;
    data.password = userPass;
    setUserData(data);
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://svgsilh.com/svg/295067.svg"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <>
            <h3 className="block text-sm font-medium leading-6 text-gray-900">
              Role
            </h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex mb-5 mt-2">
              {roleTypes.map((role, i) => (
                <li
                  className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r"
                  key={i}
                >
                  <div className="flex items-center ps-3">
                    <input
                      id={role}
                      type="radio"
                      value={role}
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                      onChange={handleRoleSelect}
                    />
                    <label
                      htmlFor={role}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                    >
                      {role + " "}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleEmail}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="/login"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handlePass}
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleDataLogin}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
