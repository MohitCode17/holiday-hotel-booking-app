type Props = {
  selectedRating: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RatingFilter = ({ selectedRating, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star, index) => (
        <label className="flex items-center space-x-2" key={index}>
          <input
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedRating.includes(star)}
            onChange={onChange}
          />
          <span>{star} Star</span>
        </label>
      ))}
    </div>
  );
};

export default RatingFilter;
