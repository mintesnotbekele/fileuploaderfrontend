import { httpService } from "../helpers/api-helper";
import { FileUploadEndPoint } from "./fileupload.endpoints";
export const getFiles = (data) => {
  return httpService
    .get(`${FileUploadEndPoint.getFiles}`, { params: data })
    .then((response) => {
      return response;
    })
};

export const createFile = (params) => {
  return httpService
    .post(`${FileUploadEndPoint.addFile}`, params)
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