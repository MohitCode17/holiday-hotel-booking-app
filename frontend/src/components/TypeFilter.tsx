import { hotelTypes } from "../config/hotel-config";

type Props = {
  selectedType: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TypeFilter = ({ selectedType, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((hotelType, index) => (
        <label className="flex items-center space-x-2" key={index}>
          <input
            type="checkbox"
            className="rounded"
            value={hotelType}
            checked={selectedType.includes(hotelType)}
            onChange={onChange}
          />
          <span>{hotelType}</span>
        </label>
      ))}
    </div>
  );
};

export default TypeFilter;
