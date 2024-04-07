import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../APP/store";
import { listingInterface } from "../types";
import { Link } from "react-router-dom";

interface CardProps {
  houses: listingInterface;
  handleDelete?: (id: string) => Promise<void>; // Make handleDelete optional
}
const Card: React.FC<CardProps> = ({ houses, handleDelete }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Link to={`/viewlisting/${houses._id}`}>
        <img
          className="w-full"
          src={houses.imageUrls[0]}
          alt="Sunset in the mountains"
        ></img>
      </Link>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{houses.name}</div>
        <p className="text-gray-700 text-base">{houses.description}</p>
      </div>
      {currentUser?.role === "admin" && (
        <div className="px-6 pt-4 pb-2 flex justify-between">
          <Link
            to={`/updatelisting/${houses._id}`}
            className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          >
            Edite
          </Link>
          <button
            onClick={() => houses._id && handleDelete?.(houses._id)}
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
