
export interface Name {
    firstname: string;
    lastname: string;
}

// export interface Teacher {
//     user_id: string;
//     username: string;
//     email: string;
//     name: Name;
//     optional_contact: string;
//     profile_pic?: any;
// }

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

export interface PostModel {
	id: string; // post id
	class_code: string; // class code
	post_author: NicknameModel;
	profile_pic: string | null; // image url
	type: string; // post, poll
	post_content: string;
	post_optional_file: FileModel[]; // additonal file from post if it has
	poll: PollModel[];
  vote_author?: VoteAuthorModel[];
	comment: CommentModel[];
	created: string;
}

export interface VoteAuthorModel {
  username: string;
  vote: number;
}

export interface AssignmentModel {
    id: string;
    assignment_name: string;
    assignment_description: string;
    score: number;
    score_result?: number;
    has_score: boolean;
    assignment_optional_file?: FileModel[];
    assignment_student_result?: any[];
    assignment_student_score?: any[];
    assignment_start_date: string;
    assignment_end_date: string;
    can_submit: boolean;
    already_submit: boolean;
    is_symbol_score: boolean;
    symbol_score: string[];
    submit_result?: {
      file_result?: [];
      answer_result?: string;
      isLate: boolean;
      url_result?: string;
    };
    status: string;
    comment: CommentModel[];
    role: string;
  }

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
  
  export interface NicknameModel {
    user_id: string;
    firstname: string;
    lastname: string;
    optional_name?: string;
  }
  
  export interface PollModel {
    id?: number;
    choice_name: string;
    vote: number; // vote count
    percentage?: number;
  }

  
  export interface ClassExamModel {
    id: string;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
  }
  
  export interface getAllAssignmentsResponse {
  id: string;
  class_code: string;
  class_name: string;
  assignment_name: string;
  assignment_description: string;
  turnin_late: boolean;
  score: Number;
  assignment_optional_file: string[];
  assignment_start_date: string; //Date,
  assignment_end_date: string; //Date,
  created: string; //Date,
  status: string;
}
