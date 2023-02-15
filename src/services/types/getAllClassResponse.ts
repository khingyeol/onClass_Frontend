import { UserModel } from "./ClassModel";

export interface GetAllClassResponseData {
    class_code: string;
    class_name: string;
    class_description?: string;
    class_section: string;
    class_room: string;
    class_subject: string;
    class_thumbnail?: any;
    teacher: UserModel;
}

export interface GetAllClassResponse {
    result: string;
    message: string;
    data: GetAllClassResponseData[];
}
