import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Table, { Specie, Character, HomeWorld } from "./components/Table";
import Nav from "./components/Nav";

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
      const peopleResponse: Character[] = requestPeople.data.results;
      console.log(peopleResponse);

      // 'new Set' to avoid duplicates,
      //'Array.from' to convert set back to array
      //this reduces extra uneccessary get requests
      const planetURLs = Array.from(
        new Set(peopleResponse.map((person) => person.homeworld))
      );

      const planetNames: string[] = [];
      const requestPlanets = await Promise.all(
        planetURLs.map((url) => axios.get(url))
      );
      console.log("Request Planets", requestPlanets);
      requestPlanets.forEach((planet, i) => {
        console.log("Planet Name: ", planet.data.name);
        console.log("Planet URL: ", planet.data.url);
        console.log("planetURLs[i]", planetURLs[i]);
        planetNames.push(planet.data.name);
      });
      console.log("planetNames", planetNames);

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

      const cacheSpecies = [...speciesArray, ...species];

      // loop through each character (massage data)
      // set chacter homeworld name
      // set character species name

      // set character state

      // setLoading(false);
      // return requestPeople;
    }
    getCharacters();
  }, [page]);

  return (
    <div className="p-5 pt-0 main-bg">
      <img src="/src/assets/StarWarsLogo.png" alt="Star Wars Logo" />

      {isLoading && (
        <h1 className="text-light text-center mt-5">Loading, please wait!</h1>
      )}
      <div className={isLoading ? "hidden" : "visible"}>
        <Nav
          page={page}
          onClickPrev={() => setPage(page > 1 ? (prev) => prev - 1 : page)}
          onClickNext={() => setPage(page < 9 ? page + 1 : page)}
          // onSearchInput={}
          // onSubmit={}
        />
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
