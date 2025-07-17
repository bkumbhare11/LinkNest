import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toggleFavourite, deleteLink } from "@/redux/linkSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { IoMdPricetags } from "react-icons/io";
import { LuNotebookPen } from "react-icons/lu";
import UpdateLink from "@/components/UpdateLink";
import toast from "react-hot-toast";

function LinkCard({ link }) {
  const dispatch = useDispatch();

  let url =
    "https://link-manager-7252f-default-rtdb.asia-southeast1.firebasedatabase.app/";

  function handleFavourite(id, current) {
    axios
      .patch(`${url}link/${id}.json`, {
        isFavourite: !current,
      })
      .then(() => {
        dispatch(toggleFavourite(id));

        if (!current) {
          toast("Added to favourite", {
            style: {
              background: "#facc15",
              text: "#000000",
            },
            icon: "⭐️",
            duration: 2000,
          });
        } else {
          toast("Removed from favourite", {
            style: {
              background: "#38bdf8", // Tailwind: sky-400
              text: "#000000",
            },
            icon: "🚫",
            duration: 2000,
          });
        }
      });
  }

  function handleDelete(id) {
    axios.delete(`${url}link/${id}.json`).then(() => {
      const confirmation = confirm("Are you sure want to delete this link");
      if (confirmation) {
        dispatch(deleteLink(id));
        console.log("Link Deleted");
        toast.error("Link Deleted Successfully", {
          style: {
            background: "#ef4444", // Tailwind: red-500
            text: "#ffffff",
          },
          duration: 2000,
        });
      }
    });
  }

  return (
    <>
      <div className="border rounded-2xl shadow-md my-5 dark:bg-zinc-900 p-3 flex justify-between transition-transform duration-300 hover:scale-105 hover:shadow-lg dark:hover:shadow-white/20">
        <div className=" w-full px-2 py-1.5 ">
          <h1 className="font-bold text-gray-900 dark:text-white text-lg sm:text-2xl ">
            {link.title}
          </h1>

          <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-lg ">
            {link.description}
          </p>

          <p className="text-pink-600 dark:text-rose-400 flex items-center gap-1.5 text-xs sm:text-sm font-medium ">
            <IoMdPricetags className=" text-base sm:text-lg " />
            {link.tag}
          </p>

          <p className="text-gray-600 dark:text-neutral-400 my-1.5 flex items-center gap-1.5 text-xs sm:text-sm font-medium ">
            <SlCalender className=" text-base sm:text-lg " />
            {link.displayDate}
          </p>

          {link.editedOn && (
            <p className="text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-medium mt-1 flex items-center gap-1 mb-3">
              <LuNotebookPen className="text-base sm:text-lg" />
              {link.editedOn} (Edited)
            </p>
          )}

          <a
            href={link.url}
            target="_blank"
            className="text-blue-500 text-xs sm:text-sm underline break-all hover:text-blue-800 dark:hover:text-blue-300 transition  "
          >
            {link.url}
          </a>
        </div>

        <div className=" flex flex-col justify-between items-center  py-1.5 px-1 sm:px-3  ">
          <div className=" sm:text-2xl flex sm:gap-4 gap-2 items-center">
            <UpdateLink link={link} key={link.id} />

            <button
              className="cursor-pointer"
              onClick={() => handleFavourite(link.id, link.isFavourite)}
            >
              {link.isFavourite ? (
                <FaStar className="text-yellow-400" />
              ) : (
                <FaRegStar />
              )}
            </button>
          </div>

          <div className=" w-full flex justify-end ">
            <button
              className="text-xl sm:text-2xl cursor-pointer"
              onClick={() => handleDelete(link.id)}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LinkCard;
