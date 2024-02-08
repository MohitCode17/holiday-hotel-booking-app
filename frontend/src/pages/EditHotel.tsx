import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";
import ManageHotelForm from "../form/ManageHotelForm/ManageHotelForm";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditHotel = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  // Call Fetch Single Hotel API
  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
      // the query will only be executed if hotelId is truthy. which mean if userId is string the query will be run else not.
    }
  );

  // Call Update Hotel API
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotel, {
    onSuccess: () => {
      toast.success("Hotel Updated");
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
      <h2 className="text-3xl font-bold">Edit Hotel</h2>
      {/* Parent form component */}
      <ManageHotelForm hotel={hotel} onSave={onSave} isLoading={isLoading} />
    </div>
  );
};

export default EditHotel;
