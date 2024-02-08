import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      // We forcefully run validateToken API to check isLoggedIn in AppContext is false or true
      toast.success("Signed Out!");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="px-3 py-2 bg-white text-primarySoft text-sm font-semibold flex items-center hover:bg-blue-50 rounded-sm"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
