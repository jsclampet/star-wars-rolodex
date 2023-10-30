interface Props {
  onClickPrev: () => void;
  onClickNext: () => void;
  onSearchInput: () => void;
  onSubmit: () => void;
  page: number;
}
//setPage(page > 1 ? setPage((prev) => prev - 1) : page)
//setPage(page < 9 ? page + 1 : page)

const Nav = ({
  onClickPrev,
  onClickNext,
  onSearchInput,
  onSubmit,
  page,
}: Props) => {
  return (
    <nav>
      <button
        className="btn nav-btn"
        disabled={page === 1}
        onClick={onClickPrev}
      >
        <BsChevronLeft />
      </button>

      <form action="" className="">
        <div className="form-group mb-4">
          <input
            placeholder="Search by keyword"
            type="search"
            id="search"
            alt="Search Bar"
            className=" bg-transparent"
            onChange={onSearchInput}
          />
          <button
            className="btn btn-secondary "
            type="submit"
            onSubmit={onSubmit}
          >
            Search
          </button>
        </div>
      </form>

      <button
        className="btn nav-btn"
        disabled={page === 9}
        onClick={onClickNext}
      >
        <BsChevronRight />
      </button>
    </nav>
  );
};

export default Nav;
