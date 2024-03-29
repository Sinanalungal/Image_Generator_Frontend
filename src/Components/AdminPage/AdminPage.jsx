import React, { useEffect, useState } from "react";
import { GrDocumentImage } from "react-icons/gr";
import "./AdminPage.css";
import Modal from "react-modal";
import EditModal from "../EditModal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../features/LoginSlice";
import { base_url } from "../../features/base_url";
import axios from "axios";
import Swal from "sweetalert2";

function AdminPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { is_Authenticated, user } = useSelector((state) => state.login);
  const [modalSub, setModalSub] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [modalPassData, setModalPassData] = useState(false);
  const [search, setSearch] = useState("");
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (is_Authenticated && !user.isSuperuser) {
      navigator("/userdashboard");
    }
  }, [is_Authenticated]);
  useEffect(() => {
    const data = {
      search: search,
    };
    if (search) {
      axios.post(`${base_url}/api/users/search/`, data).then((res) => {
        setUsersData(res.data);
      });
    }
  }, [search]);

  useEffect(() => {
    const data = { email: user.email };
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${base_url}api/users/users_data/`,
          data
        );
        setUsersData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const deleteHandling = (detail) => {
    console.log(detail.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${base_url}api/users/delete_user/${detail.id}/`)
          .then((response) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");

            setUsersData(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  return (
    <>
      <div className=" bg-white min-h-svh">
        <nav className="bg-white border-b  shadow-md">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  <svg
                    className="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <span>
                    <GrDocumentImage className="h-8 w-auto text-green-800" />
                  </span>
                  <span className="font-black text-3xl text-green-800">
                    magify
                  </span>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="relative ml-3  flex">
                  <button
                    className="Btn1 ml-2"
                    onClick={() => dispatch(userLogout())}
                  >
                    <div className="sign1">
                      <svg viewBox="0 0 512 512">
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                      </svg>
                    </div>

                    <div className="text1 text-white">Logout</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className=" w-full flex  items-center mt-4 md:w-[90%] mx-auto p-9">
          <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg   ">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-slate-300 p-9">
              {/* Dropdown Button */}
              <div className="flex mr-5 mb-4">
                <h1 className="font-black text-2xl">User Management</h1>
              </div>

              {/* Search Input */}
              <div className="flex  ">
                <button
                  className="CartBtn bg-black "
                  onClick={() => {
                    setModalIsOpenToTrue();
                    setModalSub("Add User");
                    setModalPassData(false);
                  }}
                >
                  <span className="IconContainer">
                    <svg
                      className="svg text-white"
                      fill="none"
                      height="18"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="12" x2="12" y1="5" y2="19"></line>
                      <line x1="5" x2="19" y1="12" y2="12"></line>
                    </svg>
                  </span>
                  <p className="text ml-1  text-sm text-white">Add Users</p>
                </button>

                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative ml-2">
                  <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    value={search}
                    onChange={(e) => {
                      e.target.value == ""
                        ? setSearch(" ")
                        : setSearch(e.target.value);
                    }}
                    type="text"
                    id="table-search-users"
                    className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for users"
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-500 dark:text-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersData ? (
                  usersData.map((user) => (
                    <tr
                      key={user.id}
                      className="bg-white  dark:bg-slate-100 dark:border-gray-700  hover:bg-gray-50 dark:hover:bg-slate-300"
                    >
                      <td className=" items-center">
                        <div
                          className="ml-6 w-[50px] h-[50px] bg-cover bg-center bg-no-repeat rounded-lg"
                          style={
                            user.profile
                              ? {
                                  backgroundImage: `url(${base_url}${user.profile})`,
                                }
                              : { backgroundImage: `url(./avatar.jpg)` }
                          }
                        ></div>
                      </td>
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-gray-500"
                      >
                        <div className="ps-3">
                          <div className="text-base font-semibold">
                            {user.username}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {user.phone_number}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {user.is_listed ? (
                          <>
                            <div className="flex items-center">
                              <div className="h-[8px] w-[8px] bg-green-800 rounded-lg"></div>
                              <div className="ml-1">Active</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center">
                              <div className="h-[8px] w-[8px] bg-red-800 rounded-lg"></div>
                              <div className="ml-1">Non-Active</div>
                            </div>
                          </>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                          onClick={() => {
                            setModalIsOpenToTrue();
                            setModalSub("Edit User Details");
                            setModalPassData(user);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-700 mt-1 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow ml-1"
                          onClick={() => deleteHandling({ id: user.id })}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        className=" mx-auto max-md:w-full mt-[60px] w-[30rem]"
        isOpen={modalIsOpen}
        style={{
          content: {
            background: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
            padding: "20px",
            outline: "none",
          },
          overlay: {},
        }}
      >
        <button
          onClick={setModalIsOpenToFalse}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "rgb(106,144,122)",
            color: "black",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          x
        </button>
        <EditModal
          action={modalSub}
          userdata={modalPassData}
          setModalIsOpenToFalse={setModalIsOpenToFalse}
          showemail={true}
          setUsersData={setUsersData}
        />
      </Modal>
    </>
  );
}

export default AdminPage;
