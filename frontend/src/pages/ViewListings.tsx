import React, { useEffect } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../APP/store";
import {
  getHouseStart,
  getHouseSuccess,
  getHouseFailure,
} from "../APP/features/houseSlice";

const ViewListings: React.FC = () => {
  const { houses, loading, error } = useSelector(
    (state: RootState) => state.houses
  );
  const dispatch = useDispatch();

  const getHouses = async () => {
    try {
      dispatch(getHouseStart());
      const res = await fetch("/api/listing/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(getHouseFailure(data.message));
        return;
      }
      dispatch(getHouseSuccess(data));
    } catch (error) {
      dispatch(getHouseFailure((error as Error).message));
    }
  };

  useEffect(() => {
    getHouses();
  }, []);
  console.log(houses);

  return (
    <div>
      <Header />
      <div className="p-4 sm:p-12">
        <main className="flex flex-wrap justify-center items-center gap-12">
          {loading ? (
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
              <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
            </div>
          ) : (
            houses &&
            houses.map((house, index) => <Card key={index} houses={house} />)
          )}
        </main>
      </div>
    </div>
  );
};

export default ViewListings;
