export interface Character {
  name: string;
  height: number;
  mass: number;
  birth_year: string;
  homeworld: string;
  species: string[];
  species_name?: string;
  homeworld_name?: string;
  page?: number;
  data?: [];
}

interface Props {
  characters: Character[];
  displayedResults: [];
}

const Table = ({ characters, displayedResults }: Props) => {
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
            if (displayedResults.length) {
              return (
                <tr key={crypto.randomUUID()}>
                  <td>{character.name}</td>
                  <td>{character.birth_year}</td>
                  <td>{character.height} </td>
                  <td>{character.mass} </td>
                  <td>{character.homeworld_name}</td>
                  <td>{character.species_name}</td>
                </tr>
              );
            } else {
              return (
                <tr key={crypto.randomUUID()}>
                  <td colSpan={5}>
                    Could not find your search results. Try a different
                    keyword(s) or click "Clear Results" to display all
                    Characters.
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
