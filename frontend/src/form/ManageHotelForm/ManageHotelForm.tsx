import { FormProvider, useForm } from "react-hook-form";
import GuestSection from "./GuestSection";
import HotelFacilitiesSection from "./HotelFacilitiesSection";
import HotelImages from "./HotelImages";
import HotelTypesSection from "./HotelTypesSection";
import HotelDetailsSection from "./HotelDetailsSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

// HOTEL FORM TYPE
export type HotelFormType = {
  name: string;
  city: string;
  country: string;
  description: string;
  pricePerNight: number;
  starRating: number;
  type: string;
  facilities: string[];
  adultCount: number;
  childCount: number;
  imageFiles: FileList;
  imageUrls: string[];
};

type Props = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
  hotel?: HotelType;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormType>();
  const { handleSubmit, reset } = formMethods;

  // reset: Update form back to default value
  useEffect(() => {
    reset(hotel);
  }, [reset, hotel]);

  const onSubmit = handleSubmit((formDataJson: HotelFormType) => {
    // Create new Multipart form object
    const formData = new FormData();

    // If there is existing "hotel" details then append that hotel id to formData
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("type", formDataJson.type);
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10 mt-8" onSubmit={onSubmit}>
        {/* Hotel Details Section */}
        <HotelDetailsSection />

        {/* Hotel Type Section */}
        <HotelTypesSection />

        {/* Hotel Facilities Section */}
        <HotelFacilitiesSection />

        {/* Guests Section */}
        <GuestSection />

        {/* Hotel Image Section */}
        <HotelImages />

        <span className="flex justify-end">
          <button
            disabled={isLoading}
            className="bg-blue-500 text-white px-3 py-1 rounded text-[18px] hover:bg-blue-600"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
