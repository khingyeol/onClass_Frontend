import { AssignmentModel } from "./ClassModel";

export interface GetAssignmentResponse {
    result: string;
    message: string;
    data: AssignmentModel;
  }