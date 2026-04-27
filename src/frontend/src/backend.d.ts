import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AcademicResource {
    id: string;
    title: string;
    description: string;
    storageKey: string;
    category: AcademicCategory;
    uploadedAt: bigint;
}
export enum AcademicCategory {
    curriculum = "curriculum",
    exam_schedule = "exam_schedule",
    timetable = "timetable"
}
export interface backendInterface {
    addAcademicResource(title: string, category: AcademicCategory, description: string, storageKey: string): Promise<AcademicResource>;
    deleteAcademicResource(id: string): Promise<boolean>;
    getAcademicResources(category: AcademicCategory | null): Promise<Array<AcademicResource>>;
}
