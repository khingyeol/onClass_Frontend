export interface PostCreateExam {
    class_code: string,
    exam: {
        exam_name: string,
        exam_description: string,
        part_list: ExamPart[],
        exam_start_date: string
        exam_end_date: string
    }
}

interface ExamPart {
    type: string, //objective || subjective
    question: number,
    score: number,
    // จำนวนข้อ
}