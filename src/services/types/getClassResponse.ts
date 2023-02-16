import { ClassExamModel, FileModel, NicknameModel, PollModel, VoteAuthorModel, UserModel } from "./ClassModel";

interface ClassAssignmentModel {
  id: string;
  assignment_name: string;
  assignment_description: string;
  turnin_late: boolean;
  score: number;
  assignment_optional_file?: FileModel[];
  comment: number;
  assignment_start_date: string;
  assignment_end_date: string;
  moment_sort: string;
}

  interface ClassPostModel {
    id: string;
    post_author: NicknameModel[];
    profile_pic?: string;
    type: string; // post, poll
    post_content: string;
    post_optional_file?: FileModel[];
    poll?: PollModel[];
    vote_author?: VoteAuthorModel;
    comment: number;
    created: string;
    moment_sort: string; //moment
  }

export interface ClassFeedModel {
  type: string;
  data: ClassAssignmentModel | ClassPostModel
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
  class_assignment: ClassAssignmentModel[];
  class_post: ClassPostModel[];
  class_exam: ClassExamModel[];
  class_feed?: ClassFeedModel[];
  nickname: NicknameModel[];
  role: string;
}

export interface GetClassResponse {
  result: string;
  message: string;
  data: GetClassResponseData;
}
