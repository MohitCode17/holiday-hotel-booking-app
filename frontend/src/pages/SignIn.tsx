import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { toast } from "react-toastify";

// TypeScript type SignInFormData to represent the data structure of the form.
export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const { mutate } = useMutation(apiClient.login, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("Login Success");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form
      className="flex flex-col gap-5 my-10 sm:mx-auto sm:w-full sm:max-w-sm"
      onSubmit={onSubmit}
    >
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>

      <label className="text-gray-900 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border border-gray-500 py-1 px-2 w-full font-normal rounded focus:outline-primarySoft"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>

      <label className="text-gray-900 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border border-gray-500 py-1 px-2 w-full font-normal rounded focus:outline-primarySoft"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be 6 or more characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>

      <button className="bg-primary text-white py-2 px-3 rounded hover:bg-blue-700 focus:outline-none text-lg">
        Sign In
      </button>

      <span className="flex mx-auto gap-2 font-semibold">
        Don't have an account?
        <Link to={"/sign-up"} className="underline">
          Register here
        </Link>
      </span>
    </form>
  );
};

export default SignIn;
