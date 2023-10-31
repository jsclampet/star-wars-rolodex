import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Table, { Character } from "./components/Table";
import Nav from "./components/Nav";

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);

    async function getCharacters() {
      const requestPeople = await axios.get(
        `https://swapi.dev/api/people/?page=${page}`
      );
      const peopleResponse: Character[] = requestPeople.data.results;

      const planetURLs = Array.from(
        new Set(peopleResponse.map((person) => person.homeworld))
      );
      const planetNames: string[] = [];
      const requestPlanets = await Promise.all(
        planetURLs.map((url) => axios.get(url))
      );
      requestPlanets.forEach((planet) => {
        planetNames.push(planet.data.name);
      });

      const specieURLs: string[] = Array.from(
        new Set(
          peopleResponse
            .filter((character: Character) => character.species.length)
            .map((character: Character) => character.species[0])
        )
      );
      const requestSpecies = await Promise.all(
        specieURLs.map((url) => axios.get(url))
      );
      const speciesNames: string[] = requestSpecies.map(
        (specie) => specie.data.name
      );

      const species_name = (character: Character) => {
        console.log("character.species[0]", character.species[0]);
        console.log("indexOf", specieURLs.indexOf(character.species[0]));
        console.log(
          "speciesName indexOf",
          speciesNames[specieURLs.indexOf(character.species[0])]
        );

        return specieURLs.includes(character.species[0])
          ? speciesNames[specieURLs.indexOf(character.species[0])]
          : "Unknown";
      };

      const homeworld_name = (character: Character) => {
        return planetURLs.includes(character.homeworld)
          ? planetNames[planetURLs.indexOf(character.homeworld)]
          : "Unknown";
      };

      // const cacheSpecies = [...speciesArray, ...species];
      const characterList = peopleResponse.map((character, i) => {
        return {
          ...character,
          birth_year: character.birth_year.split("BBY")[0] + " BBY",
          species_name: species_name(character),
          homeworld_name: homeworld_name(character),
        };
      });

      setCharacters(characterList);
      // loop through each character (massage data)
      // set chacter homeworld name
      // set character species name

      // set character state

      setLoading(false);
      // return requestPeople;
      console.log(characters);
    }
    getCharacters();
    console.log(characters);
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
        {!isLoading && <Table characters={characters} />}
      </div>
    </div>
  );
};

export default App;
