import { AxiosResponse } from "axios";
import { server, api_exam } from "../constants";
import httpClient from "../httpClient";
import { PostCreateExam } from "../types/postCreateExam";

// exam/get
export const getExam = async (class_code: string, exam_id: string) => {
    // const res =  await httpClient.post(server.EXAM_URL+api_exam.GET, { class_code, exam_id});
    // if (res.data.result == 'nOK') {
    //     return {valid: 'NO', data: [res.data.message]}
    // } else if (res.data.result == 'OK') {
    //     return {valid: 'YES', data: res.data.data}
    // }
    // else {
    //     return {valid: 'FAIL', data: ''}
    // }
    return await httpClient.post(server.EXAM_URL+api_exam.GET, { class_code, exam_id});
};

// exam/get/all
export const getAllExam = async (class_code: string) => {
    return await httpClient.post(server.EXAM_URL+api_exam.GET_ALL, { class_code });
};

// exam/create
export const createExam = async (values: PostCreateExam) => {
    return await httpClient.post(server.EXAM_URL+api_exam.CREATE, values);
};

// exam/edit
export const editExam = async (values: PostCreateExam) => {
    return await httpClient.patch(server.EXAM_URL+api_exam.EDIT, values)
}
