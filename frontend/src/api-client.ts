import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// FETCHING REGISTER USER API
export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message);
    };
};

// FETCHING LOGIN USER API
export const login = async (formData:SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();
    if(!response.ok) {
        throw new Error(responseBody.message);
    };

    return responseBody;
};

// FETCHING VALIDATE-TOKEN API
export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Token is invalid");
    };

    return await response.json();
}

// FETCHING LOGOUT API
export const logout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
    });

    if(!response.ok) {
        throw new Error("Failed to logout!!");
    };
}

//  ========================================================================================================

// FETCHING ADD HOTEL API
export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
      method: "POST",
      credentials: "include",
      body: hotelFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to add hotel");
    }

    return response.json();
};
