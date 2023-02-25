export interface AssignmentRequestData {
    assignment_name: string;
    assignment_description: string;
    turnin_late: boolean;
    is_symbol_score: boolean;
    symbol_score: string[];
    score: number;
    assignment_optional_file: string[];
    assignment_end_date: string;    
}

export interface CreateAssignmentRequest {
  class_code: string;
  data: AssignmentRequestData;
}
