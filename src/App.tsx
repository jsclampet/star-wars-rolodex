import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import Table, { Character } from "./components/Table";
import Nav from "./components/Nav";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [characterSearchResult, setCharacterSearchResult] = useState<
    Character[]
  >([]);
  const [userInput, setUserInput] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    //clear errors and set to loading state
    setCharacterSearchResult([]);
    setError("");
    setLoading(true);

    // if navigating through pagination and chars already cached, exit useEffect
    if (!showSearchResults && characters.length >= page) {
      setLoading(false);
      return;
    }

    async function getCharacters() {
      const controller = new AbortController();
      try {
        // main API call, depending if searching or navigating
        const requestPeople = await axios.get(
          !showSearchResults
            ? `https://swapi.dev/api/people/?page=${page}`
            : `https://swapi.dev/api/people/?search=${userInput}`,
          {
            signal: controller.signal,
          }
        );

        const peopleResponse: Character[] = requestPeople.data.results;

        // set planets
        const planetURLs = Array.from(
          new Set(peopleResponse.map((person) => person.homeworld))
        );
        const planetNames: string[] = [];
        const requestPlanets = await Promise.all(
          planetURLs.map((url) => axios.get(url, { signal: controller.signal }))
        );
        requestPlanets.forEach((planet) => {
          planetNames.push(planet.data.name);
        });

        // set species
        const specieURLs: string[] = Array.from(
          new Set(
            peopleResponse
              .filter((character: Character) => character.species.length)
              .map((character: Character) => character.species[0])
          )
        );
        const requestSpecies = await Promise.all(
          specieURLs.map((url) => axios.get(url, { signal: controller.signal }))
        );
        const speciesNames: string[] = requestSpecies.map(
          (specie) => specie.data.name
        );

        // format and set values for
        const species_name = (character: Character) => {
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
        const characterList = peopleResponse.map((character) => {
          return {
            ...character,
            birth_year:
              character.birth_year === "unknown"
                ? character.birth_year
                : character.birth_year.split("BBY")[0] + " BBY",
            species_name: species_name(character),
            homeworld_name: homeworld_name(character),
          };
        });

        if (showSearchResults) {
          setCharacterSearchResult([characterList]);
          setLoading(false);
          return;
        }
        setCharacters([...characters, { page: page, data: characterList }]);
        setLoading(false);
      } catch (err: unknown) {
        setLoading(false);
        setError(`${err.message}`);
      }
      return () => controller.abort();
    }
    getCharacters();
  }, [page, showSearchResults, toggleSearch]);

  const displayedCharacters =
    !showSearchResults && characters[page - 1]
      ? characters[page - 1].data
      : showSearchResults && characterSearchResult
      ? characterSearchResult
      : null;

  return (
    <div className="p-5 pt-0 main-bg">
      <img src="/src/assets/StarWarsLogo.png" alt="Star Wars Logo" />

      {isLoading && (
        <h1 className="text-light text-center mt-5">Loading, please wait!</h1>
      )}

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        !isLoading &&
        characters.length >= page && (
          <div className={isLoading ? "hidden" : "visible"}>
            <Nav
              isSearchView={showSearchResults}
              page={page}
              onClickPrev={() => setPage((currentPage) => currentPage - 1)}
              onClickNext={() => setPage((currentPage) => currentPage + 1)}
              onClear={() => {
                setShowSearchResults(false);
              }}
              onSubmit={(e) => {
                e.preventDefault();
                setShowSearchResults(true);
                setToggleSearch(!toggleSearch);
                console.log(characterSearchResult);
              }}
              onSearchInput={(e: ChangeEvent<HTMLInputElement>) => {
                setUserInput(e.target.value);
              }}
            />
            <Table
              characters={displayedCharacters}
              displayedResults={displayedCharacters}
            />
          </div>
        )
      )}
    </div>
  );
};

export default App;
