import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const defaultPlanets = localStorage.getItem("planets") || [];
  const defaultSpecies = localStorage.getItem("species") || [];
  const defaultCharacters = JSON.parse(localStorage.getItem("character")) || [];

  const [planets, setPlanets] = useState(defaultPlanets);
  const [species, setSpecies] = useState(defaultSpecies);
  const [characters, setCharacters] = useState(defaultCharacters);

  useEffect(() => {
    axios.get("https://swapi.dev/api/people/?page=1").then((data) => {
      setCharacters(data.data.results);
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    let planetsArray = [];
    characters.forEach((character) => {
      const planetReformatted: string = character.homeworld
        .split("/")
        .slice(4, 6)
        .join("");
      if (!Object.values(planetsArray).includes(character.homeworld)) {
        const controller = new AbortController();
        axios.get(character.homeworld).then(({ data }) => {
          planetsArray = [
            ...planetsArray,
            { planetReformatted: data.name, url: character.homeworld },
          ];
          planetsArray.forEach((planet) => console.log(planet));
          return controller.abort();
        });
      }
    });
    return controller.abort();
  }, [characters]);

  // // // // // // // // // // // // // // // //

  const formatBirthYear = (character) => {
    return character.birth_year == "unknown"
      ? character.birth_year
      : character.birth_year.split("B")[0] + " BBY";
  };

  return (
    <div className="p-5">
      <h1 className="mb-2 text-center">StarWars</h1>
      <input type="text" id="search" alt="Search Bar" className="mb-4" />
      <table className="table table-bordered">
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
            characters.map((character) => {
              return (
                <tr key={crypto.randomUUID()}>
                  <td>{character.name}</td>
                  <td>{formatBirthYear(character)}</td>
                  <td>{character.height} cm</td>
                  <td>{character.mass} kg</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
