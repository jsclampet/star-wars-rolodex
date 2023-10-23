import apiClient from "./apiClient";

class UserService {
  getAllPeople() {
    const controller = new AbortController();
    const request = apiClient.get("/people/?page=1")

    return { request, cancel: ()=> controller.abort() }
  }
  
  getSpecies(dependency) {
    if (dependency.length) {
      axios.all(planetUrls.map((url) => axios.get(url)))
    }
  }
}
export default new UserService();