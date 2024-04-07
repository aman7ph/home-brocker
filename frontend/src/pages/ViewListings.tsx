import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../APP/store";
import {
  getHouseStart,
  getHouseSuccess,
  getHouseFailure,
  deleteHouseStart,
  deleteHouseFailure,
} from "../APP/features/houseSlice";

const ViewListings: React.FC = () => {
  const [stateTracker, setStateTracker] = useState<boolean>(false);
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
  const handleDelete = async (id: string) => {
    try {
      dispatch(deleteHouseStart());
      const res = await fetch(
        `http://localhost:8080/api/listing/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteHouseFailure(data.message));
      }
      setStateTracker((prevState) => !prevState);
    } catch (error: any) {
      dispatch(deleteHouseFailure(error.message));
    }
  };
  useEffect(() => {
    getHouses();
  }, [stateTracker]);

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
            houses.map((house, index) => (
              <Card key={index} houses={house} handleDelete={handleDelete} />
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default ViewListings;
