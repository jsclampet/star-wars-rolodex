import apiClient from "./apiClient";
import axios from "axios";
class UserService {
  getAllPeople() {
    const controller = new AbortController();
    const request = apiClient.get("/people/?page=1")

    return { request, cancel: ()=> controller.abort() }
  }
  
  getMultipleResponses(arrayOfURLs){
  const controller = new AbortController();
  const request = axios.all(arrayOfURLs.map((url) => apiClient.get(url)))
  return { request , cancel: ()=> controller.abort() }
  }
}
export default new UserService();