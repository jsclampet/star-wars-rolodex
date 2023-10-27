import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import userService from "./services/user-service";

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    async function getCharacters() {
      setLoading(true);
      const requestPeople = await axios.get(
        `https://swapi.dev/api/people/?page=${page}`,
        { signal: controller.signal }
      );
      console.log("People", requestPeople.data.results[0].homeworld);

      const requestPlanets = await Promise.all();
      return requestPeople;
    }
    getCharacters();

    async function getPlanets() {}
    // for (const character of characters) {
    //   // get species data
    //   const speciesResponse = await axios.get(character.species[0]);
    //   character.speciesName = speciesResponse.data.name;
    //   // get planert data
    //   const planetResponse = await axios.get(character.homeworld);
    //   character.homeworldName = planetResponse.data.name;
    return () => controller.abort();
  }, [page]);
  //     // set character data to state
  //     setCharacters(characters);
  //   }, [page]);

  //   useEffect(() => {
  //     const planetEndpoints = Array.from(
  //       new Set(characters.map((char) => char.homeworld.split("api")[2]))
  //     );
  //     const { request, cancel } =
  //       userService.getMultipleResponses(planetEndpoints);
  //     if (characters.length) {
  //       request.then((data) => {
  //         const planetNames = [];
  //         data.forEach((response, i) => {
  //           planetNames.push({
  //             url: planetEndpoints[i],
  //             name: response.data.name,
  //           });
  //         });
  //         setPlanets(planetNames);
  //       });
  //       return () => cancel();
  //     }
  //     setLoading(false);
  //   }, [characters]);

  //   useEffect(() => {
  //     const controller = new AbortController();
  //     const knownSpecies = characters.filter((char) => char.species.length > 0);
  //     const knownSpeciesUrls = Array.from(
  //       new Set(knownSpecies.map((char) => char.species[0]))
  //     );
  //     const speciesNamesAndURLs = [];
  //     axios
  //       .all(knownSpeciesUrls.map((url) => axios.get(url)))
  //       .then((responses) => {
  //         responses.forEach(({ data }) => {
  //           speciesNamesAndURLs.push({ name: data.name, url: data.url });
  //           setSpecies(speciesNamesAndURLs);
  //         });
  //       })
  //       .then(() => setSpecies(speciesNamesAndURLs))
  //       .then(() => setLoading(false));
  //     return () => controller.abort();
  //   }, [characters]);

  //   const formatBirthYear = (character) => {
  //     return character.birth_year == "unknown"
  //       ? character.birth_year
  //       : character.birth_year.split("B")[0] + " BBY";
  //   };

  return "hello";
  // return (
  //   <div className="p-5 pt-0 main-bg">
  //     <img
  //       src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Star_Wars_Logo..png/640px-Star_Wars_Logo..png"
  //       alt=""
  //     />
  //    {isLoading && (
  //         <h1 className="text-light text-center">Loading, please wait!</h1>
  //       )}
  //       <div className={isLoading ? "hidden" : "visible"}>
  //         <form action="" className="">
  //           <div className="form-group mb-4">
  //             <input
  //               placeholder="Search by keyword"
  //               type="search"
  //               id="search"
  //               alt="Search Bar"
  //               className=" bg-transparent"
  //             />
  //             <button className="btn btn-secondary " type="submit">
  //               Search
  //             </button>
  //           </div>
  //         </form>
  //         <table className="table table-bordered mb-4">
  //           <thead>
  //             <tr>
  //               <th>Name</th>
  //               <th>Birth Date</th>
  //               <th>Height</th>
  //               <th>Mass</th>
  //               <th>Home World</th>
  //               <th>Species</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {characters.length > 0 &&
  //               planets.length > 0 &&
  //               species.length > 0 &&
  //               characters.map((character) => {
  //                 return (
  //                   <tr key={crypto.randomUUID()}>
  //                     <td>{character.name}</td>
  //                     <td>{formatBirthYear(character)}</td>
  //                     <td>{character.height} cm</td>
  //                     <td>
  //                       {character.mass === "unknown"
  //                         ? "unknown"
  //                         : character.mass + " kg"}
  //                     </td>
  //                     <td>
  //                       {planets.length > 0 &&
  //                         // ADDING STRINGIFY TO SEE WHAT IS OBJECTS ARE BEING RETURNED
  //                         // WITHOUT STRINGIFY, CODE BREAKS:
  //                         //    --- ERROR MESSAGE name is undefined

  //                         planets.filter(
  //                           (planet) =>
  //                             planet.url === character.homeworld.split("api")[2]
  //                         )[0].name}
  //                     </td>
  //                     <td>{character.speciesName}</td>
  //                   </tr>
  //                 );
  //               })}
  //           </tbody>
  //         </table>
  //         <nav aria-label="Page navigation">
  //           <ul className="pagination">
  //             <li className="page-item">
  //               <a
  //                 className="page-link"
  //                 onClick={() => (page > 1 ? setPage((prev) => prev - 1) : page)}
  //                 href="#"
  //               >
  //                 Previous
  //               </a>
  //             </li>
  //             <li className="page-item">
  //               <a className="page-link" href="#">
  //                 1
  //               </a>
  //             </li>
  //             <li className="page-item">
  //               <a className="page-link" href="#">
  //                 2
  //               </a>
  //             </li>
  //             <li className="page-item">
  //               <a className="page-link" href="#">
  //                 3
  //               </a>
  //             </li>
  //             <li className="page-item">
  //               <a
  //                 className="page-link"
  //                 href="#"
  //                 onClick={() => setPage(page + 1)}
  //               >
  //                 Next
  //               </a>
  //             </li>
  //           </ul>
  //         </nav>
  //       </div>
  //    </div>
};

export default App;
