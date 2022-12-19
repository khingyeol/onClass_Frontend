import { AxiosResponse } from 'axios';
import { getAllClassResponse } from '../../screen/Home/HomePage';
import { server, api_class } from '../constants';
import httpClient from '../httpClient';

export const getAllClass = async (): Promise<AxiosResponse<any>> => {
    return await httpClient.get(server.CLASS_URL+api_class.GET_ALL);
};

export const getfromClass = async (id: string) => {
    return await httpClient.get(server.CLASS_URL+api_class.GET+`/${id}`)
}

// class/assignment/get
// export const assignmentGet = async (values) => {
//     return await httpClient.post(server.CLASS_URL+api_class.ASM_GET, values);
// }

// // class/assignment/get/all
export const getTodo = async (class_code: string) => {
    return await httpClient.post(server.CLASS_URL+api_class.ASM_ALL, class_code);
}

// // class/assignment/get/all/notification 
// export const assignmentAllClass = async (values) => {
//     return await httpClient.post(server.CLASS_URL+api_class.ASM_ALL_CLASS, values);
// }

// // class/assignment/create
// export const assignmentCreate = async (values) => {
//     return await httpClient.post(server.CLASS_URL+api_class.ASM_CREATE, values);
// }

// // class/assignment/submit
// export const assignmentStdSubmit = async (values) => {
//     return await httpClient.patch(server.CLASS_URL+api_class.ASM_STD_SUBMIT, values);
// }

// // class/assignment/score/submit
// export const assignmentScoreSubmit = async (values) => {
//     return await httpClient.patch(server.CLASS_URL+api_class.ASM_SCORE_SUBMIT, values);
// }

// // class/assignment/comment
// export const assignmentComment = async (values) => {
//     return await httpClient.patch(server.CLASS_URL+api_class.ASM_COMMENT, values);
// }

// // class/nickname
// export const setClassNickname = async (values) => {
//     return await httpClient.patch(server.CLASS_URL+api_class.NICKNAME, values);
// }

// // class/create
// export const createClass = async (values) => {
//     return await httpClient.post(server.CLASS_URL+api_class.CREATE, values);
// }

// // class/join
export const joinClass = async (class_code: string) => {
    return await httpClient.patch(server.CLASS_URL+api_class.JOIN, {class_code});
}

// // class/leave
// export const leaveClass = async (values) => {
//     return await httpClient.patch(server.CLASS_URL+api_class.LEAVE, values);
// }


// // class/edit/details
// export const editClassDetail = async (values) => {
//     return await httpClient.patch(server.CLASS_URL+api_class.EDIT_DETAILS, values);
// }

// // class/edit/roles
// export const editClassRole = async (values) => {
//     return await httpClient.patch(server.CLASS_URL+api_class.EDIT_ROLES, values);
// }

// // class/post/publish
// export const postPublish = async (values) => {
//     return await httpClient.post(server.CLASS_URL+api_class.PUBLISH, values);
// }

// // class/post/comment
// export const postComment = async (values) => {
//     return await httpClient.patch(server.CLASS_URL+api_class.COMMENT_POST, values);
// }

// // class/post/get
// export const postGet = async (values) => {
//     return await httpClient.post(server.CLASS_URL+api_class.GET_POST, values);
// }