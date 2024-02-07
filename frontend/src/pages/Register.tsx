import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

// TypeScript type RegisterFormData to represent the data structure of the form.
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  // useMutation: To handle mutations, which are operations that modify data on the server, such as creating, updating, or deleting records.

  const { mutate } = useMutation(apiClient.register, {
    onSuccess: () => {
      toast.success("Registration Successful");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form
      className="flex flex-col gap-5 my-10 sm:mx-auto sm:w-full sm:max-w-sm"
      onSubmit={onSubmit}
    >
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register to your account
      </h2>

      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-900 text-sm font-bold flex-1">
          First Name
          {/* register your input into the hook by invoking the "register" function */}
          <input
            type="text"
            className="border border-gray-500 py-1 px-2 w-full font-normal rounded focus:outline-primarySoft"
            {...register("firstName", { required: "This field is required" })}
          />
          {/* errors will return when field validation fails  */}
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-900 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border border-gray-500 py-1 px-2 w-full font-normal rounded focus:outline-primarySoft"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>

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

      <label className="text-gray-900 text-sm font-bold flex-1">
        Confirm password
        {/* watch input value by passing the name of it */}
        <input
          type="password"
          className="border border-gray-500 py-1 px-2 w-full font-normal rounded focus:outline-primarySoft"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Password do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>

      <button className="bg-primary text-white py-2 px-3 rounded hover:bg-blue-700 text-lg">
        Create account
      </button>

      <span className="flex mx-auto gap-2 font-semibold">
        Already have an account?
        <Link to={"/sign-in"} className="underline">
          Sign In
        </Link>
      </span>
    </form>
  );
};

export default Register;
