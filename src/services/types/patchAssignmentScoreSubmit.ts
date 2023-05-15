export interface AssignmentScoreSubmit {
    class_code: string;
    assignment_id: string;
    data: AssignmentScoreSubmitScoreData[]
}

export interface AssignmentScoreSubmitScoreData {
    student_id: string,
    score: number
}