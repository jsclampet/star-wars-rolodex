import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Table, { Specie, Character, HomeWorld } from "./components/Table";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [homeWorld, setHomeWorld] = useState<HomeWorld[]>([]);
  const [species, setSpecies] = useState<Specie[]>([]);
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

      const filteredPlanetURLs: string[] = Array.from(
        new Set(
          requestPeople.data.results.map(
            (person: Character) => person.homeworld
          )
        )
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
            .filter((character: Character) => character.species.length)
            .map((character: Character) => character.species[0])
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
        <nav>
          <button
            className="btn btn-light"
            disabled={page === 1}
            onClick={() => (page > 1 ? setPage((prev) => prev - 1) : page)}
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
              />
              <button className="btn btn-secondary " type="submit">
                Search
              </button>
            </div>
          </form>

          <button
            className="btn btn-light"
            disabled={page === 9}
            onClick={() => setPage(page < 9 ? page + 1 : page)}
          >
            <BsChevronRight />
          </button>
        </nav>

        {!isLoading && (
          <Table
            characters={characters}
            homeWorld={homeWorld}
            species={species}
          />
        )}
      </div>
    </div>
  );
};

export default App;
