import { useFormContext } from "react-hook-form";
import { HotelFormType } from "./ManageHotelForm";

const HotelImages = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormType>();

  // Getting existing images from imageUrls
  const existingImageUrls = watch("imageUrls");

  // Handle Delete for Hotel Images
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>, // This is likely an event triggered by a button click
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Upload Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {existingImageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img src={url} className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              // const totalLength = imageFiles.length;
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);
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
