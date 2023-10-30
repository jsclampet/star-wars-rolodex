import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [homeWorld, setHomeWorld] = useState([]);
  const [species, setSpecies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);

    async function getCharacters() {
      const controller = new AbortController();
      const requestPeople = await axios.get(
        `https://swapi.dev/api/people/?page=${page}`
      );
      setCharacters(requestPeople.data.results);

      const filteredPlanetURLs = Array.from(
        new Set(requestPeople.data.results.map((person) => person.homeworld))
      );
      const requestPlanets = await Promise.all(
        filteredPlanetURLs.map((url) => axios.get(url))
      );
      const planetsArray = requestPlanets.map((response) => {
        return { name: response.data.name, url: response.data.url };
      });
      setHomeWorld(planetsArray);

      const filteredSpecieUrls = Array.from(
        new Set(
          requestPeople.data.results
            .filter((character) => character.species.length)
            .map((character) => character.species[0])
        )
      );
      const requestSpecies = await Promise.all(
        filteredSpecieUrls.map((url) => axios.get(url))
      );
      const speciesArray = requestSpecies.map((specie) => {
        return { name: specie.data.name, url: specie.data.url };
      });
      setSpecies(speciesArray);

      setLoading(false);
      return requestPeople;
    }
    getCharacters();
  }, [page]);

  const formatBirthYear = (character) => {
    return character.birth_year !== "unknown"
      ? character.birth_year.split("B")[0] + " BBY"
      : "Unknown";
  };

  const getHomeWorld = (character) => {
    if (!character.homeworld.length) return "unknown";
    return homeWorld.filter((planet) => planet.url === character.homeworld)[0]
      .name;
  };

  const getSpecies = (character) => {
    if (!character.species.length) return "unknown";
    return species.filter((specie) => specie.url === character.species[0])[0]
      .name;
  };

  return (
    <div className="p-5 pt-0 main-bg">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Star_Wars_Logo..png/640px-Star_Wars_Logo..png"
        alt=""
      />

      {isLoading && (
        <h1 className="text-light text-center mt-5">Loading, please wait!</h1>
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
            {!isLoading &&
              characters.map((character) => {
                return (
                  <tr key={crypto.randomUUID()}>
                    <td>{character.name}</td>
                    <td>{formatBirthYear(character)}</td>
                    <td>{character.height} cm</td>
                    <td>{character.mass} kg</td>
                    <td>{getHomeWorld(character) || "hello"}</td>
                    <td>{getSpecies(character) || "hello"}</td>
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
                aria-disabled={page === 1}
                onClick={() => (page > 1 ? setPage((prev) => prev - 1) : page)}
                href="#"
              >
                Previous
              </a>
            </li>
            <li onClick={() => setPage(1)} className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li onClick={() => setPage(2)} className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a onClick={() => setPage(3)} className="page-link" href="#">
                3
              </a>
            </li>
            <li onClick={() => setPage(4)} className="page-item">
              <a className="page-link" href="#">
                4
              </a>
            </li>
            <li className="page-item">
              <a onClick={() => setPage(5)} className="page-link" href="#">
                5
              </a>
            </li>
            <li className="page-item">
              <a onClick={() => setPage(6)} className="page-link" href="#">
                6
              </a>
            </li>
            <li className="page-item">
              <a onClick={() => setPage(7)} className="page-link" href="#">
                7
              </a>
            </li>
            <li className="page-item">
              <a onClick={() => setPage(8)} className="page-link" href="#">
                8
              </a>
            </li>
            <li className="page-item">
              <a onClick={() => setPage(9)} className="page-link" href="#">
                9
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-disabled={page === 9}
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
