import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { FaHotel, FaStar, FaBed } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

const MyHotels = () => {
  // Fetch Hotels
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-3xl">My Hotels</h2>
        <Link
          className="bg-blue-600 text-white sm:text-lg font-bold p-2 hover:bg-blue-500 rounded "
          to={"/add-hotel"}
        >
          Add Hotel
        </Link>
      </div>

      {/* Display Hotels */}
      <div className="flex flex-col gap-8">
        {!hotelData || hotelData.length === 0 ? (
          <span>No hotel found</span>
        ) : (
          hotelData?.map((hotel) => (
            <div
              key={hotel._id}
              className="flex flex-col justify-between gap-5 border border-slate-300 rounded-lg p-8"
            >
              <h2 className="font-bold text-2xl">{hotel.name}</h2>
              <div className="line-clamp-3 text-gray-700">
                {hotel.description}
              </div>

              <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-1 border border-slate-400 p-2 rounded-md text-sm">
                  <FaLocationDot className="text-green-500" />
                  {hotel.city}, {hotel.country}
                </div>

                <div className="flex items-center gap-1 border border-slate-400 p-2 rounded-md text-sm">
                  <FaHotel className="text-red-500" />
                  {hotel.type}
                </div>

                <div className="flex items-center gap-1 border border-slate-400 p-2 rounded-md text-sm">
                  <BiMoney className="text-green-600" />₹{hotel.pricePerNight}{" "}
                  per night
                </div>

                <div className="flex items-center gap-1 border border-slate-400 p-2 rounded-md text-sm">
                  <FaBed className="text-orange-600" /> {hotel.adultCount}{" "}
                  adults, {hotel.childCount} children
                </div>

                <div className="flex items-center gap-1 border border-slate-400 p-2 rounded-md text-sm">
                  <FaStar className="text-yellow-500" />
                  {hotel.starRating} Star rating
                </div>
              </div>
              <span className="flex justify-end">
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="p-2 bg-blue-600 text-white rounded hover:bg-blue-500 text-sm"
                >
                  Edit Details
                </Link>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyHotels;
