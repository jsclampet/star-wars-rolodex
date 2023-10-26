import apiClient from "./apiClient";
import axios from "axios";
class UserService {

  getAllPeople(pageNumber: number) {
    const controller = new AbortController();
    const request = apiClient.get(`/people/?page=${pageNumber}`)
    return { request, cancel: ()=> controller.abort() }
  }
  
  getMultipleResponses(arrayOfURLs){
  const controller = new AbortController();
  const request = Promise.all(arrayOfURLs.map((url) => apiClient.get(url)))
  return { request , cancel: ()=> controller.abort() }
  }

}
export default new UserService();