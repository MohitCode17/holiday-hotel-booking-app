import { useFormContext } from "react-hook-form";
import { hotelFacilites } from "../../config/hotel-config";
import { HotelFormType } from "./ManageHotelForm";

const HotelFacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormType>();

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Facilities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {hotelFacilites.map((facility, index) => (
          <label
            key={index}
            className="text-sm flex items-center font-semibold text-gray-700 gap-1 cursor-pointer"
          >
            <input
              type="checkbox"
              value={facility}
              className="cursor-pointer"
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 font-bold text-sm">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default HotelFacilitiesSection;
