import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import Modal from "react-modal";
import EditModal from "../EditModal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { dataFetch, userLogout } from "../../features/LoginSlice";
import MyModalComponent from "./ProfileUpdateModal";
import { base_url } from "../../features/base_url";

Modal.setAppElement("#root");

function UserProfile() {
  const { user } = useSelector((store) => store.login);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageUpdateModal, setImageUpdateModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataFetch());
  }, [modalIsOpen]);
  console.log(user);
  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setImageUpdateModal(true);
  };

  const closeModal = () => {
    setImageUpdateModal(false);
  };

  return (
    <>
      <div className="h-[700px] w-full flex justify-center  items-center ">
        <div className="border-2  shadow-2xl border-gray-300 rounded-lg lg:w-[80%] h-[85%] max-md:grid  w-full  bg-gray-400 flex  relative min-[385px]:items-center">
          <div
            onClick={openModal}
            className=" max-[385px]:mt-[77px] bg-cover bg-center bg-no-repeat rounded-md absolute w-[180px] ml-[20%]  max-sm:h-[43%]  max-sm:w-[150px] max-md:ml-4 h-[50%] flex "
            style={
              user.profile
                ? { backgroundImage: `url(${base_url}${user.profile})` }
                : { backgroundImage: `url(./avatar.jpg)` }
            }
          >
            <span className="bg-gray-100 opacity-0 hover:opacity-60 cursor-pointer p-1 rounded-sm w-full flex items-center justify-center font-black">
              Edit
            </span>
          </div>

          <div className="bg-black w-[26%] max-md:w-full max-md:flex max-md:justify-between  h-full">
            <div className="text-white font-serif mt-3 ml-4 text-xl font-black">
              PROFILE
            </div>
            <div className="text-white ml-2 md:hidden mr-2 flex mt-2">
              <button
                className="Btn mt-3 text-xs "
                onClick={setModalIsOpenToTrue}
              >
                <div className="sign">
                  <svg height="1em" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
                </div>
                <div className="text z-0">edit</div>
              </button>
              <button
                className="Btn2 forred ml-2 mt-3 text-white text-xs mr-2 bg-red-600"
                onClick={() => dispatch(userLogout())}
              >
                <div className="sign ">
                  <svg viewBox="0 0 512 512">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div className="text2 ">Logout</div>
              </button>
            </div>
          </div>
          <div className="bg-gray-200 max-md:w-full h-full w-[74%] flex justify-end">
            <div className="mr-4 flex flex-col justify-center h-full text-3xl lg:text-2xl max-sm:text-xl md:text-2xl font-black font-serif">
              <div className="mb-3">{user.username}</div>
              <div className="mb-3">{user.phone_number}</div>
              <div>{user.email}</div>
            </div>
            <div className="h-full flex max-md:hidden bg-gray-200">
              <button
                className="Btn mt-3 text-xs "
                onClick={setModalIsOpenToTrue}
              >
                <div className="sign">
                  <svg height="1em" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                  </svg>
                </div>
                <div className="text z-0">edit</div>
              </button>
              <button
                className="Btn2 forred ml-2 mt-3 text-white text-xs mr-2 bg-red-600"
                onClick={() => dispatch(userLogout())}
              >
                <div className="sign ">
                  <svg viewBox="0 0 512 512">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div className="text2 ">Logout</div>
              </button>
            </div>
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
          action="Edit Details"
          userdata={false}
          setModalIsOpen={setModalIsOpen}
          showemail={false}
        />
      </Modal>
      <MyModalComponent isOpen={imageUpdateModal} onClose={closeModal} />
    </>
  );
}

export default UserProfile;
