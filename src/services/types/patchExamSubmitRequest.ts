export interface PatchExamStudentSubmitRequest {
    class_code: string;
    exam_id: string;
    data: ExamStudentAnswer[]
}

export interface ExamStudentAnswer {
   part_id: string;
   part_type: string;
   answer: string[][];
}