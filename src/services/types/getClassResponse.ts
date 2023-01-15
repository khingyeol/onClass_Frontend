import { Name } from "./getAllClassResponse";

export interface FileModel {
  file_name: string;
  file_extension: string;
  file_path: string;
}

export interface UserModel {
  user_id: string;
  username: string;
  email: string;
  name: Name;
  optional_contact?: string;
  profile_pic?: string;
}

export interface AssignmentModel {
  id: string;
  assignment_name: string;
  assignment_description: string;
  turnin_late: boolean;
  score: number;
  assignment_optional_file?: FileModel[];
  comment: number;
  assignment_start_date: Date;
  assignment_end_date: Date;
  moment_sort: number;
}

export interface NicknameModel {
  user_id: string;
  firstname: string;
  lastname: string;
  optional_name?: string;
}

export interface PollModel {
  choice_name: string;
  vote: number; // vote count
}

export interface PostModel {
  id: string;
  post_author: NicknameModel[];
  profile_pic?: string;
  type: string; // post, poll
  post_content: string;
  post_optional_file?: FileModel[];
  poll?: PollModel[];
  comment: number;
  created: Date;
  moment_sort: number; //moment
}

export interface ClassExamModel {
  id: string;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
}

export interface GetClassResponseData {
  class_code: string;
  class_name: string;
  class_description: string;
  class_section: string;
  class_room: string;
  class_subject: string;
  class_thumbnail?: string;
  teacher: UserModel[];
  student: UserModel[];
  class_assignment: AssignmentModel[];
  class_post: PostModel[];
  class_exam: ClassExamModel[];
  class_feed: [{ type: string; date: AssignmentModel | PostModel }];
  nickname: NicknameModel[];
}

export interface GetClassResponse {
    result: string;
    message: string;
    data: GetClassResponseData;
}