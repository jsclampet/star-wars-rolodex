export interface Character {
  name: string;
  height: number;
  mass: number;
  birth_year: string;
  homeworld: string;
  species: string[];
}

export interface HomeWorld {
  name: string;
  url: string;
}

export interface Specie {
  name: string;
  url: string;
}

interface Props {
  characters: Character[];
  homeWorld: HomeWorld[];
  species: Specie[];
}

const Table = ({ characters, homeWorld, species }: Props) => {
  const formatBirthYear = (character: Character) => {
    return character.birth_year !== "unknown"
      ? character.birth_year.split("B")[0] + " BBY"
      : "Unknown";
  };

  const getHomeWorld = (character: Character) => {
    if (!character.homeworld.length) return "unknown";
    return homeWorld.filter((planet) => planet.url === character.homeworld)[0]
      .name;
  };

  const getSpecies = (character: Character) => {
    if (!character.species.length) return "unknown";
    return species.filter((specie) => specie.url === character.species[0])[0]
      .name;
  };

  return (
    <div>
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
          {characters.map((character) => {
            return (
              <tr key={crypto.randomUUID()}>
                <td>{character.name}</td>
                <td>{formatBirthYear(character)}</td>
                <td>{character.height} cm</td>
                <td>{character.mass} kg</td>
                <td>{getHomeWorld(character)}</td>
                <td>{getSpecies(character)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
