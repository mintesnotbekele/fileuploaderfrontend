import { httpService } from "../helpers/api-helper";
import { FileUploadEndPoint } from "./fileupload.endpoints";
import axios from "axios";
export const getFiles = (data) => {
  return httpService
    .get(`${FileUploadEndPoint.getFiles}`, { params: data })
    .then((response) => {
      return response;
    })
};

export const createFile = (params) => {
  return axios.
    post(`http://localhost:3001/api/v1/file/createFile`, 
    params)
    .then((response) => {
      return response;
    });
};

export const deleteFile = (id)=> {
  return httpService
    .delete(`${FileUploadEndPoint.deleteFile}/${id}`)
    .then((response) => {
      return response;
    });
};