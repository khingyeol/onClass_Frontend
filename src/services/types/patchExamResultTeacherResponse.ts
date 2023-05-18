export interface PatchExamResultTeacherResponse {
  id: string;
  exam_id: string;
  class_code: string;
  student_result: ExamResultStudentResult[];
  student_score: ExamResultStudentScore[];
}

export interface ExamResultStudentResult {
  name: {
    user_id: string;
    firstname: string;
    lastname: string;
    optional_name?: string;
  };
  part_id: string;
  part_type: string;
  answer: string[][];
}

export interface ExamResultStudentScore {
  name: {
    user_id: string;
    firstname: string;
    lastname: string;
    optional_name?: string;
  };
  part_id: string;
  part_type: string;
  part_score: number[];
  sum_score: number;
}
