import { FormProvider, useForm } from "react-hook-form";
import GuestSection from "./GuestSection";
import HotelFacilitiesSection from "./HotelFacilitiesSection";
import HotelImages from "./HotelImages";
import HotelTypesSection from "./HotelTypesSection";
import HotelDetailsSection from "./HotelDetailsSection";

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
};

type Props = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelFormType>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFormType) => {
    // Create new Multipart form object
    const formData = new FormData();

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
