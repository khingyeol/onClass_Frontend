
export interface ClassEditRolesRequest {
    class_code: string;
    data: {
        user_id: string;
        role: string;
    }
}