export interface PostPublishRequest {
	class_code: string, // required
    data: {
		type: string, // required only normal | poll
		post_content: string, // required content of post
		post_optional_file: string[], // required array of file id (can be [] )
		poll: string[] // required if type is poll array of choice name
	}
  }
  