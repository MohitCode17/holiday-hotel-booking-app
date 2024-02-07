import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-config";
import { HotelFormType } from "./ManageHotelForm";

const HotelTypesSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormType>();

  // watch which radio input to be select
  const watchType = watch("type");

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Type of Hotel</h2>
      <div className="flex flex-wrap gap-3">
        {hotelTypes.map((type, index) => (
          <label
            key={index}
            className={`${
              watchType === type
                ? "px-5 py-2 bg-primarySoft text-white rounded-full font-semibold text-sm cursor-pointer"
                : "px-5 py-2 bg-gray-300 rounded-full font-semibold text-sm cursor-pointer"
            }`}
          >
            <input
              type="radio"
              value={type}
              hidden
              {...register("type", { required: "Hotel type is required" })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 font-bold text-sm">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default HotelTypesSection;
