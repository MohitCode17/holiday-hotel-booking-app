import { useSearchContext } from "../context/SearchContext";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import React, { useState } from "react";
import SearchHotelCard from "../components/SearchHotelCard";
import Pagination from "../components/Pagination";
import TypeFilter from "../components/TypeFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import RatingFilter from "../components/RatingFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();

  // Search Params Object
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedRating,
    types: selectedType,
    facilities: selectedFacility,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  // Calling Search API
  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  // Handle Star rating change
  const handleStarRatingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const starRating = event.target.value;

    setSelectedRating((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  // Handle hotel type change
  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedType((prevType) =>
      event.target.checked
        ? [...prevType, hotelType]
        : prevType.filter((type) => type !== hotelType)
    );
  };

  // Handle hotel facilities change
  const handleHotelFacilitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelFacility = event.target.value;

    setSelectedFacility((prevFacility) =>
      event.target.checked
        ? [...prevFacility, hotelFacility]
        : prevFacility.filter((facility) => facility !== hotelFacility)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      {/* Filter Section */}
      <div className="border border-slate-300 p-5 h-fit sticky top-10 z-[9999]">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          {/* Filter Options */}
          <RatingFilter
            selectedRating={selectedRating}
            onChange={handleStarRatingChange}
          />
          <TypeFilter
            selectedType={selectedType}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacility={selectedFacility}
            onChange={handleHotelFacilitiesChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>

      {/* Search Hotel Section */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          {/* Sort Option */}
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>

        {/* Hotel Card */}
        {hotelData?.data.map((hotel, index) => (
          <SearchHotelCard key={index} hotel={hotel} />
        ))}

        {/* Pagination */}
        <Pagination
          page={hotelData?.pagination.page || 1}
          pages={hotelData?.pagination.pages || 1}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Search;
