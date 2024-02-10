import { hotelFacilites } from "../config/hotel-config";

type Props = {
  selectedFacility: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacility, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {hotelFacilites.map((hotelFacility, index) => (
        <label className="flex items-center space-x-2" key={index}>
          <input
            type="checkbox"
            className="rounded"
            value={hotelFacility}
            checked={selectedFacility.includes(hotelFacility)}
            onChange={onChange}
          />
          <span>{hotelFacility}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
