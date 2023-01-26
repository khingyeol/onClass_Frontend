import { PostModel } from "./ClassModel";

export interface GetPostResponse {
	result: string;
	message: string;
	data: PostModel[];
}