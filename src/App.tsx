import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import userService from "./services/user-service";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    async function getCharacters() {
      setLoading(true);

      const requestPeople = await axios.get(
        `https://swapi.dev/api/people/?page=${page}`,
        { signal: controller.signal }
      );

      const planetURLs = requestPeople.data.results.map(
        (character) => character.homeworld
      );
      const requestPlanets = await Promise.all(
        planetURLs.map((url) => axios.get(url, { signal: controller.signal }))
      );
      requestPlanets.forEach(({ data }, i) => {
        console.log(i, data.url, data.name);
      });

      const specieURLs = requestPeople.data.results
        .filter((character) => character.species.length)
        .map((character) => character.species[0]);
      const requestSpecies = await Promise.all(
        specieURLs.map((url) => axios.get(url, { signal: controller.signal }))
      );
      requestSpecies.forEach(({ data }, i) => {
        console.log(i, data.url, data.name);
      });

      return requestPeople;
    }
    getCharacters();
    // for (const character of characters) {
    //   get species data
    //   const speciesResponse = await axios.get(character.species[0]);
    //   character.speciesName = speciesResponse.data.name;
    //   get planert data
    //   const planetResponse = await axios.get(character.homeworld);
    //   character.homeworldName = planetResponse.data.name;
    setLoading(false);
    return () => controller.abort();
  }, [page]);

  return (
    <div className="p-5 pt-0 main-bg">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Star_Wars_Logo..png/640px-Star_Wars_Logo..png"
        alt=""
      />

      {isLoading && (
        <h1 className="text-light text-center">Loading, please wait!</h1>
      )}
      <div className={isLoading ? "hidden" : "visible"}>
        <form action="" className="">
          <div className="form-group mb-4">
            <input
              placeholder="Search by keyword"
              type="search"
              id="search"
              alt="Search Bar"
              className=" bg-transparent"
            />
            <button className="btn btn-secondary " type="submit">
              Search
            </button>
          </div>
        </form>

        <table className="table table-bordered mb-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Birth Date</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Home World</th>
              <th>Species</th>
            </tr>
          </thead>

          <tbody>
            {characters.length > 0 &&
              planets.length > 0 &&
              species.length > 0 &&
              characters.map((character) => {
                return (
                  <tr key={crypto.randomUUID()}>
                    <td>{character.name}</td>
                    <td>{formatBirthYear(character)}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => (page > 1 ? setPage((prev) => prev - 1) : page)}
                href="#"
              >
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => setPage(page + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default App;
