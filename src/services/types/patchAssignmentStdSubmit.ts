export interface AssignmentStdSubmit {
    class_code: string;
    assignment_id: string;
    data: {
        file_result?: Array<any>,
        answer_result?: string,
        url_result?: string,
    }
  }
  