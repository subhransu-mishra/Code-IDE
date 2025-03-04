import React, { useState } from "react";
import img from "../images/code.png";
import deleteImg from "../images/delete.png";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";

const ListCard = ({ item }) => {
  const navigate = useNavigate();
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const [isDeleteloading, setIsDeleteLoading] = useState(false);
  const deleteProj = (id) => {
    setIsDeleteLoading(true);
    fetch(api_base_url + "/deleteProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progId: id,
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsDeleteModelShow(false);
          window.location.reload();
          setIsDeleteLoading(false);
        } else {
          toast.success(data.message);
          setIsDeleteModelShow(false);
        }
      });
  };
  return (
    <>
      <div className="listCard mb-2 w-[full] flex items-center justify-between p-[10px] bg-[#141414] cursor-pointer rounded-lg hover:bg-[#202020]">
        <div
          onClick={() => {
            navigate(`/editior/${item._id}`);
          }}
          className="flex items-center gap-2"
        >
          <img className="w-[80px]" src={img} alt="" />
          <div>
            <h3 className="text-[20px]">{item.title}</h3>
            <p className="text-[gray] text-[14px]">
              Created in {new Date(item.date).toDateString()}
            </p>
          </div>
        </div>
        <div>
          <img
            onClick={() => {
              setIsDeleteModelShow(true);
            }}
            className="w-[28px] cursor-pointer mr-4"
            src={deleteImg}
            alt=""
          />
        </div>
      </div>

      {isDeleteModelShow && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-[#141414] rounded-lg p-6 w-full max-w-md shadow-lg"
    >
      <h3 className="text-xl sm:text-2xl text-white font-bold text-center">
        Delete Project Confirmation
      </h3>
      <p className="text-gray-300 text-center mt-2 text-sm sm:text-base">
        Are you sure you want to delete this project? This action cannot be undone.
      </p>

      <div className="flex w-full mt-6 gap-4 items-center flex-col sm:flex-row">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => deleteProj(item._id)}
          className="w-full sm:flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition duration-200 text-white font-medium"
        >
          {isDeleteloading ? <BeatLoader color="#fff" size={8} /> : "Delete"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsDeleteModelShow(false)}
          className="w-full sm:flex-1 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-200 text-white font-medium"
        >
          Cancel
        </motion.button>
      </div>
    </motion.div>
  </div>
)}

    </>
  );
};

export default ListCard;
