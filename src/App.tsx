import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [planets, setPlanets] = useState<string[]>([]);
  const [species, setSpecies] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("https://swapi.dev/api/people/?page=1").then(({ data }) => {
      setCharacters(data.results);
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    if (characters.length) {
      axios
        .all(characters.map((character) => axios.get(character.homeworld)))
        .then((data) => console.log(data));
    }
    return controller.abort();
  }, [characters]);

  // useEffect(() => {
  //   const controller = new AbortController();

  //   let planetsArray = [];
  //   characters.forEach((character) => {
  //     const planetReformatted: string = character.homeworld
  //       .split("/")
  //       .slice(4, 6)
  //       .join("");
  //     if (!Object.values(planetsArray).includes(character.homeworld)) {
  //       const controller = new AbortController();
  //       axios.get(character.homeworld).then(({ data }) => {
  //         planetsArray = [
  //           ...planetsArray,
  //           { planetReformatted: data.name, url: character.homeworld },
  //         ];
  //         // planetsArray.forEach((planet) => console.log(planet));
  //         return controller.abort();
  //       });
  //     }
  //   });
  //   return controller.abort();
  // }, [characters]);

  // // // // // // // // // // // // // // // //

  const formatBirthYear = (character) => {
    return character.birth_year == "unknown"
      ? character.birth_year
      : character.birth_year.split("B")[0] + " BBY";
  };

  return (
    <div className="p-5 pt-0 main-bg">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Star_Wars_Logo..png/640px-Star_Wars_Logo..png"
        alt=""
      />
      <input
        placeholder="Search by keyword"
        type="text"
        id="search"
        alt="Search Bar"
        className="mb-4 bg-transparent"
      />
      <table className="table table-bordered mb-5 ">
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
