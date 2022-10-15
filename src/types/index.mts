type APICallResponse<T> = {
  code: Response["status"];
  meta: {
    pagination: { total: number; pages: number; page: number; limit: number };
  };
  data: T;
};

export type APICall<T> = Promise<APICallResponse<T>>;

export type EntityType = {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
};

export type PostType = EntityType & {
  user_id: UserType["id"];
  title: string;
  body: string;
};

export type CommentType = EntityType & {
  post_id: PostType["id"];
  user_id: UserType["id"];
  body: string;
};

export type UserType = EntityType & {
  name: string;
  email: string;
  gender: string;
  status: string;
};
