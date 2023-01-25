import { FileModel } from "./getClassResponse";

export interface CommentModel {
    comment_author: {
        user_id: string;
        firstname: string;
        lastname: string;
        optional_name?: string;
    }
    profile_pic: string;
    content: string;
    create: string;
}

export interface AssignmentModel {
  id: string;
  assignment_name: string;
  assignment_description: string;
  score: number;
  assignment_optional_file?: FileModel[];
  assignment_start_date: string;
  assignment_end_date: string;
  can_submit: boolean;
  submit_result?: {
    file_result?: [];
    answer_result?: string;
    isLate: boolean;
  };
  status: string;
  comment: CommentModel[];
  role: string;
}

export interface GetAssignmentResponse {
    result: string;
    message: string;
    data: AssignmentModel;
  }