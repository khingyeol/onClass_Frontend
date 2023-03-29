import { AxiosResponse } from "axios";
import { server, api_class } from "../constants";
import httpClient from "../httpClient";
import { GetAllClassResponse } from "../types/getAllClassResponse";
import { GetAssignmentResponse } from "../types/getAssignmentResponse";
import { GetClassResponse } from "../types/getClassResponse";
import { GetPostResponse } from "../types/getPostResponse";
import { AssignmentStdSubmit } from "../types/patchAssignmentStdSubmit";
import { JoinClassRequest } from "../types/patchClassJoinRequest";
import { CreateAssignmentRequest } from "../types/postAssignmentCreate";
import { CreateClassRequest } from "../types/postClassCreateRequest";
import { PostPublishRequest } from "../types/postPostPublishRequest";

// class/get/all
export const getAllClass = async (): Promise<
  AxiosResponse<GetAllClassResponse>
> => {
  return await httpClient.get(server.CLASS_URL + api_class.GET_ALL);
};

// class/get/:classid
export const getfromClass = async (
  id: string
): Promise<AxiosResponse<GetClassResponse>> => {
  const response = await httpClient.get(
    server.CLASS_URL + api_class.GET + `/${id}`
  );
  return response;
};

// class/assignment/get
export const assignmentGet = async (
  class_code: string,
  assignment_id: string
) => {
  return await httpClient.post(server.CLASS_URL + api_class.ASM_GET, {
    class_code,
    assignment_id,
  });
};

// // class/assignment/get/all
export const getTodo = async (class_code: string) => {
  return await httpClient.post(server.CLASS_URL + api_class.ASM_ALL, {
    class_code,
  });
};

// // class/assignment/get/all/notification
export const assignmentAllClass = async () => {
  return await httpClient.get(server.CLASS_URL + api_class.ASM_ALL_CLASS);
};

// // class/assignment/create
// export const assignmentCreate = async (values) => {
//     return await httpClient.post(server.CLASS_URL+api_class.ASM_CREATE, values);
// }

// // class/assignment/submit
export const assignmentStdSubmit = async (values: AssignmentStdSubmit) => {
    return await httpClient.patch(server.CLASS_URL+api_class.ASM_STD_SUBMIT, values);
}

// // class/assignment/score/submit
// {
//   classcode: string 
//   assignment_id: string
//   score_data: [{student_id: string, score: number}]
// }
// export const assignmentScoreSubmit = async (values) => {
//     return await httpClient.patch(server.CLASS_URL+api_class.ASM_SCORE_SUBMIT, values);
// }

// // class/assignment/comment
export const assignmentComment = async (
  class_code: string,
  id: string,
  comment: string
) => {
  return await httpClient.patch(server.CLASS_URL + api_class.ASM_COMMENT, {
    class_code,
    id,
    data: { content: comment },
  });
};

// // class/assignment/create
export const createAssigment = async (body: CreateAssignmentRequest) => {
  return await httpClient.post(server.CLASS_URL + api_class.ASM_CREATE, body);
};


// // class/nickname
// export const setClassNickname = async (values) => {
//     return await httpClient.patch(server.CLASS_URL+api_class.NICKNAME, values);
// }

// // class/create
export const createClass = async (body: CreateClassRequest) => {
  return await httpClient.post(server.CLASS_URL + api_class.CREATE, body);
};

// // class/join
export const joinClass = async (body: JoinClassRequest) => {
  return await httpClient.patch(server.CLASS_URL + api_class.JOIN, body);
};

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
export const postPublish = async (body: PostPublishRequest) => {
  return await httpClient.post(server.CLASS_URL + api_class.PUBLISH, body);
};

// // class/post/comment
export const postComment = async (
  class_code: string,
  id: string,
  comment: string
) => {
  return await httpClient.patch(server.CLASS_URL + api_class.COMMENT_POST, {
    class_code,
    id,
    data: { content: comment },
  });
};

export const postPollVote = async (
  class_code: string,
  post_id: string,
  choice_name: string
) => {
  return await httpClient.patch(server.CLASS_URL + api_class.POLL_VOTE, {
    class_code,
    post_id,
    choice_name,
  });
};

// // class/post/get
export const postGet = async (
  class_code: string,
  post_id: string
): Promise<AxiosResponse<GetPostResponse>> => {
  return await httpClient.post(server.CLASS_URL + api_class.GET_POST, {
    class_code,
    post_id,
  });
};
