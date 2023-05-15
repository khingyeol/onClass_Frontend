import { AxiosResponse } from "axios";
import { server, api_exam } from "../constants";
import httpClient from "../httpClient";
import { PostCreateExam } from "../types/postCreateExam";

// exam/get/all
export const getAllExam = async (class_code: string) => {
    return await httpClient.post(server.EXAM_URL+api_exam.GET_ALL, { class_code });
};


// exam/create
export const createExam = async (values: PostCreateExam) => {
    return await httpClient.post(server.EXAM_URL+api_exam.CREATE, values);
};

