import React, { useState } from 'react';
import deleteImg from "../images/delete.png";
import codeImg from "../images/code.png";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GridCard = ({ item, onDelete }) => {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(item._id); // Call delete function passed as prop
    setIsDeleteModelShow(false);
    toast.success("Project deleted successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="gridCard bg-[#141414] w-[270px] p-[10px] h-[180px] cursor-pointer hover:bg-[#202020] rounded-lg shadow-lg shadow-black/50">
        <div onClick={() => navigate(`/editor/${item._id}`)}>
          <img className="w-[90px]" src={codeImg} alt="Project" />
          <h3 className="text-[20px] w-[90%] line-clamp-1">{item.title}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[14px] text-[gray]">Created on {new Date(item.date).toDateString()}</p>
          <img
            onClick={() => setIsDeleteModelShow(true)}
            className="w-[30px] cursor-pointer"
            src={deleteImg}
            alt="Delete"
          />
        </div>
      </div>

      {isDeleteModelShow && (
        <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center items-center">
          <div className="mainModel w-[25vw] h-[25vh] bg-[#141414] rounded-lg p-[20px]">
            <h3 className="text-3xl">Do you want to delete this project?</h3>
            <div className="flex w-full mt-5 items-center gap-[10px]">
              <button
                onClick={handleDelete}
                className="p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModelShow(false)}
                className="p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GridCard;
