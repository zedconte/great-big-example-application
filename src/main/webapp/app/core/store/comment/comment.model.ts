import { Profile } from '../profile/profile.model';

export interface Comment {
    id: number;
    body: string;
    createdAt: string;
    author: Profile;
}

export const initialComment = {
    id: null,
    body: null,
    createdAt: null,
    author: null
};
