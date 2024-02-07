import { useFormContext } from "react-hook-form";
import { HotelFormType } from "./ManageHotelForm";

const HotelDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormType>();

  return (
    <div className="flex flex-col gap-4">
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border border-gray-500 focus:outline-primarySoft rounded w-full py-1 px-2 font-semibold"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex flex-col md:flex-row gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border border-gray-500 focus:outline-primarySoft rounded w-full py-1 px-2 font-semibold"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            className="border border-gray-500 focus:outline-primarySoft rounded w-full py-1 px-2 font-semibold"
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border border-gray-500 focus:outline-primarySoft rounded w-full py-1 px-2 font-semibold"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Pirce per night
        <input
          type="number"
          className="border border-gray-500 focus:outline-primarySoft rounded w-full py-1 px-2 font-semibold"
          min={1}
          {...register("pricePerNight", {
            required: "Price per night is required",
          })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Hotel Rating
        <select
          className="border border-gray-500 focus:outline-primarySoft rounded w-full py-1 px-2 font-semibold"
          {...register("starRating", { required: "This field is required" })}
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((val) => (
            <option value={val} key={val}>
              {val}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default HotelDetailsSection;
