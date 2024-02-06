import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <form className="flex flex-col gap-5 my-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>

      <label className="text-gray-900 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border border-gray-500 py-1 px-2 w-full font-normal rounded focus:outline-primarySoft"
        />
      </label>

      <label className="text-gray-900 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border border-gray-500 py-1 px-2 w-full font-normal rounded focus:outline-primarySoft"
        />
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
