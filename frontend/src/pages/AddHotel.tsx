import { useMutation } from "react-query";
import ManageHotelForm from "../form/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
  const navigate = useNavigate();
  // Call API
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      toast.success("Hotel Added!");
      navigate("/my-hotels");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Call Mutate on onSave
  const onSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold">Add Hotel</h2>
      {/* Parent form component */}
      <ManageHotelForm onSave={onSave} isLoading={isLoading} />
    </div>
  );
};

export default AddHotel;
