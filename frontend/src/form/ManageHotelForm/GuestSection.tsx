import { useFormContext } from "react-hook-form";
import { HotelFormType } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormType>();

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Guests</h2>
      <div className="flex flex-col sm:flex-row gap-2 bg-gray-300 p-5 rounded">
        <label className="text-sm font-bold flex-1">
          Adults
          <input
            type="number"
            className="border border-gray-500 focus:outline-primarySoft rounded w-full py-1 px-2 font-normal"
            min={1}
            {...register("adultCount", { required: "This field is required" })}
          />
          {errors.adultCount && (
            <span className="text-red-500">{errors.adultCount.message}</span>
          )}
        </label>
        <label className="text-sm font-bold flex-1">
          Childs
          <input
            type="number"
            className="border border-gray-500 focus:outline-primarySoft rounded w-full py-1 px-2 font-normal"
            min={0}
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount && (
            <span className="text-red-500">{errors.childCount.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;
