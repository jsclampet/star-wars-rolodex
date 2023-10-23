import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [planets, setPlanets] = useState<string[]>([]);
  const [species, setSpecies] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios.get("https://swapi.dev/api/people/?page=1").then(({ data }) => {
      setCharacters(data.results);
    });

    return controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    if (characters.length) {
      const planetUrls = Array.from(
        new Set(characters.map((char) => char.homeworld))
      );
      axios.all(planetUrls.map((url) => axios.get(url))).then((data) => {
        const planetNames = [];
        data.forEach((response, i) => {
          planetNames.push({ url: planetUrls[i], name: response.data.name });
        });
        setPlanets(planetNames);
      });
      return controller.abort();
    }

    setLoading(false);
  }, [characters]);

  useEffect(() => {
    const controller = new AbortController();
    const knownSpecies = characters.filter((char) => char.species.length > 0);
    const knownSpeciesUrls = Array.from(
      new Set(knownSpecies.map((char) => char.species[0]))
    );
    const speciesNamesAndURLs = [];
    axios
      .all(knownSpeciesUrls.map((url) => axios.get(url)))
      .then((responses) => {
        responses.forEach(({ data }) => {
          speciesNamesAndURLs.push({ name: data.name, url: data.url });
          setSpecies(speciesNamesAndURLs);
        });
      });
  }, [characters]);

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
            species.length > 0 &&
            characters.map((character) => {
              return (
                <tr key={crypto.randomUUID()}>
                  <td>{character.name}</td>
                  <td>{formatBirthYear(character)}</td>
                  <td>{character.height} cm</td>
                  <td>{character.mass} kg</td>
                  <td>
                    {
                      planets.filter(
                        (planet) => planet.url === character.homeworld
                      )[0].name
                    }
                  </td>
                  <td>
                    {character.species.length
                      ? species.filter(
                          (specie) => specie.url === character.species[0]
                        )[0].name
                      : "Unknown"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
