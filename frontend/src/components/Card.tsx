import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../APP/store";
import { listingInterface } from "../types";

interface CardProps {
  houses: listingInterface;
}
const Card: React.FC<CardProps> = ({ houses }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  console.log(houses);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src={houses.imageUrls[0]}
        alt="Sunset in the mountains"
      ></img>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{houses.name}</div>
        <p className="text-gray-700 text-base">{houses.description}</p>
      </div>
      {currentUser?.role === "admin" ? (
        <div className="px-6 pt-4 pb-2 flex justify-between">
          <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Edite
          </button>
          <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
            Delete
          </button>{" "}
        </div>
      ) : (
        <div className="px-6 pt-4 pb-4 flex justify-center">
          <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Detail
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
