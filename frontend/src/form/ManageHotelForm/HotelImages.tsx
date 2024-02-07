import { useFormContext } from "react-hook-form";
import { HotelFormType } from "./ManageHotelForm";

const HotelImages = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormType>();

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Upload Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              if (totalLength === 0) {
                return "At least one image should be added";
              } else if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 font-bold text-sm">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default HotelImages;
