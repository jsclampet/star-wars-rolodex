import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [starWarsData, setStarWarsData] = useState([]);
  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people/?page=1")
      .then((data) => setStarWarsData(data.data.results));
  }, []);

  return (
    <div>
      <h1>StarWars</h1>
      <input type="text" />
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
          {starWarsData.length > 0 &&
            starWarsData.map((character) => {
              return (
                <tr>
                  <td>{character.name}</td>
                  <td>{character.birth_year}</td>
                  <td>{character.height}</td>
                  <td>{character.mass}</td>
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
