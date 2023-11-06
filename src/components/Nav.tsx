import { ChangeEvent, FormEvent, FormEventHandler } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface Props {
  onClickPrev: () => void;
  onClickNext: () => void;
  onSearchInput?: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClear?: () => void;
  page: number;
  isSearchView: boolean;
}

const Nav = ({
  onClickPrev,
  onClickNext,
  onSearchInput,
  onSubmit,
  page,
  onClear,
  isSearchView,
}: Props) => {
  return (
    <nav>
      <button
        className="btn nav-btn"
        disabled={page === 1 || isSearchView}
        onClick={onClickPrev}
      >
        <BsChevronLeft />
      </button>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group mb-4">
          <input
            placeholder="Search by keyword"
            type="search"
            id="search"
            alt="Search Bar"
            className="bg-dark"
            onInput={onSearchInput}
          />
          <button className="btn btn-light " type="submit">
            Search
          </button>
          <button
            className="btn btn-outline-light"
            onClick={onClear}
            type="button"
          >
            Clear Search
          </button>
        </div>
      </form>

      <button
        className="btn nav-btn"
        disabled={page === 9 || isSearchView}
        onClick={onClickNext}
      >
        <BsChevronRight />
      </button>
    </nav>
  );
};

export default Nav;
