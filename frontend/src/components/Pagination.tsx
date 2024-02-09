export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
        {pageNumbers.map((number, index) => (
          <li
            key={index}
            className={`px-3 py-1 cursor-pointer ${
              page === number ? "bg-blue-200" : ""
            }`}
          >
            <button
              className="cursor-pointer"
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
