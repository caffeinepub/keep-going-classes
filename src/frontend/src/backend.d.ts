import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AdmissionRequest {
    id: bigint;
    name: string;
    email: string;
    motivation: string;
    program: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface Article {
    id: bigint;
    title: string;
    content: string;
    published: boolean;
    author: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createArticle(title: string, content: string, author: string): Promise<bigint>;
    deleteAdmissionRequest(id: bigint): Promise<void>;
    deleteArticle(id: bigint): Promise<void>;
    getAllAdmissionRequests(): Promise<Array<AdmissionRequest>>;
    getAllPublishedArticles(): Promise<Array<Article>>;
    getArticleById(id: bigint): Promise<Article>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setArticlePublished(id: bigint, published: boolean): Promise<void>;
    submitAdmissionRequest(name: string, email: string, program: string, motivation: string): Promise<bigint>;
    updateArticle(id: bigint, title: string, content: string, author: string): Promise<void>;
}
