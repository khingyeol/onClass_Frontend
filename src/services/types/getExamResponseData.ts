export interface GetExamResponseData {
    id:                 string;
    optional_setting?:   OptionalSetting[];
    exam_name:          string;
    exam_description:   string;
    author:             string;
    part_list:          ExamPartList[];
    exam_optional_file?: any[];
    exam_start_date:    Date;
    exam_end_date:      Date;
}

 interface OptionalSetting {
    random_question: boolean;
    random_choice:   boolean;
    std_getResult:   boolean;
}

export interface ExamPartList {
    part_id: string;
    type:  string;
    score: number; // string?
    item?:  ExamChoiceItem[];
    question?: number;
    question_default_index?: number[];
}

export interface ExamChoiceItem {
    question: string;
    type?:     string;
    image?:    string;
    choice?:   string[];
    answer?:   string[];
    score?:    string;
}