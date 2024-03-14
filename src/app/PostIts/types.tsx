import type { Key } from "react";

type PostIt = {
    id: Key;
    title?: string;
    text?: string;
};

export type { PostIt };