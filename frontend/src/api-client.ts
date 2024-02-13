import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelSearchResponse, HotelType, PaymentIntentResponse, UserType } from "../../backend/src/shared/types";
import { BookingFormData } from "./form/BookingForm/BookingForm";

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

// FETCHING CURRENT USER API
export const fetchCurrentUser = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include"
    });

    if(!response.ok) {
        throw new Error("Failed to fetch user details");
    };

    return await response.json();
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

// FETCHING HOTELS
export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "GET",
        credentials: "include",
    });

    if(!response.ok) {
        throw new Error ("Failed to fetch hotels");
    };

    return response.json(); // return type is HotelType[]
};

// FETCHING HOTEL BY ID
export const fetchMyHotelById = async (hotelId:string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include",
    });

    if(!response.ok) {
        throw new Error("Failed to fetch hotel");
    };

    return response.json();
};

// FETCH UPDATE HOTEL API
export const updateMyHotel = async (hotelFormData:FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        credentials: "include",
        body: hotelFormData
    });

    if(!response.ok) {
        throw new Error("Failed to update hotel");
    };

    return response.json();
};

// =========================================================================================================

// FETCH SEARCH HOTEL API

export type SearchParamsType = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    sortOption?:string;
    stars?:string[];
    facilities?:string[];
    types?:string[];
    maxPrice?:string;
};

export const searchHotels = async (searchParams:SearchParamsType): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    searchParams.stars?.forEach((star) => queryParams.append("stars", star));
    searchParams.types?.forEach((type) => queryParams.append("types", type));
    searchParams.facilities?.forEach((facility) => queryParams.append("facilities", facility));

    queryParams.append("maxPrice", searchParams.maxPrice || "");

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

    if(!response.ok) {
        throw new Error("Failed to fetch hotels");
    };

    return response.json();
};

// FETCHING SINGLE HOTEL API BY HOTEL ID
export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);

    if(!response.ok) {
        throw new Error("Failed to fetch hotel");
    }
    return await response.json();
}

// FETCH REQUEST FOR CREATE PAYMENT INTENT
export const createPaymentIntent = async (
    hotelId: string,
    numberOfNight: string
  ): Promise<PaymentIntentResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ numberOfNight }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Error fetching payment intent");
    }
  
    return response.json();
  };

// FETCH REQUEST FOR ROOM BOOKING
export const createRoomBooking = async (formData: BookingFormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );
  
    if (!response.ok) {
      throw new Error("Error booking room");
    }
};