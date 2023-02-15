import httpClient from "../httpClient";
import { server, api_file } from "../constants";

export const uploadFile = async (file: FormData) => {
    return await httpClient.post(server.FILE_URL+api_file.UPLOAD_FILE, file);
};

// export const uploadImage = async (values) => {
//     return await httpClient.post(server.FILE_URL+api_file.UPLOAD_IMAGE,values);
// };