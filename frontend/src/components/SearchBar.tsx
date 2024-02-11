import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";
import { FormEvent, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();

  // Create Local State for the searchBar component

  // Get search values into search context if any of exists and stored in local state in this component
  // We don't want to save the local state of the form fields in the search context as the user's typing, it'll cause the entire app to re-render any time if user change any of the form values which will give us a bit of performance hit.

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  // Submit search bar value to SearchContext
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      className="-mt-8 p-2 bg-orange-500 rounded shadow-md flex flex-col lg:flex-row items-center gap-2"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center w-full bg-white p-3 gap-1 rounded">
        <IoLocationOutline size={22} />
        <input
          type="text"
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none placeholder:text-gray-500 placeholder:text-sm"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex items-center w-full bg-white p-2 gap-1 rounded">
        <GoPerson size={22} />
        <label className="items-center flex flex-1">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-semibold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex flex-1">
          Childs:
          <input
            className="w-full p-1 focus:outline-none font-semibold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>

      <div className="flex items-center w-full bg-white p-3 rounded">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="w-full focus:outline-none placeholder:text-gray-500 placeholder:text-sm cursor-pointer"
        />
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="w-full focus:outline-none placeholder:text-gray-500 placeholder:text-sm cursor-pointer"
        />
      </div>

      <div className="w-full lg:max-w-[110px] bg-blue-700 text-center cursor-pointer hover:bg-blue-600 font-semibold rounded">
        <button className="text-white w-full p-3">Search</button>
      </div>
    </form>
  );
};

export default SearchBar;
