import { TUser } from "./user.types";

export type TPost = {
    author: TUser,
    content: string;
    title: string;
    createdAt: string;
    updatedAt?: Date;
    _id: string;
}