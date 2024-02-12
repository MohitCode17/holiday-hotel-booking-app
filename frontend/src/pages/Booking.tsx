import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../form/BookingForm/BookingForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import BookingDetailsSummary from "../components/BookingDetailsSummary";

const Booking = () => {
  const { hotelId } = useParams();
  const search = useSearchContext();

  const [numberOfNight, setNumberOfNight] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNight(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  // Call fetch api from get hotel
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    { enabled: !!hotelId }
  );

  // Call fetch api from currentUser
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNight={numberOfNight}
        hotel={hotel}
      />
      {currentUser && <BookingForm currentUser={currentUser} />}
    </div>
  );
};

export default Booking;
