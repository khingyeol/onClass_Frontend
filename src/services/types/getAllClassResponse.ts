export interface Name {
    firstname: string;
    lastname: string;
}

export interface Teacher {
    user_id: string;
    username: string;
    email: string;
    name: Name;
    optional_contact: string;
    profile_pic?: any;
}

export interface GetAllClassResponseData {
    class_code: string;
    class_name: string;
    class_description?: string;
    class_section: string;
    class_room: string;
    class_subject: string;
    class_thumbnail?: any;
    teacher: Teacher;
}

export interface GetAllClassResponse {
    result: string;
    message: string;
    data: GetAllClassResponseData[];
}
