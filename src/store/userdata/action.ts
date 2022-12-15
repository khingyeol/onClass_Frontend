export interface UserNameModel {
    firstname: string;
    lastname: string;
}

export interface UserModel {
    username: string;
    email: string;
    profile_pic: string;
    name: UserNameModel
    device_id: string;
    state: string;
}