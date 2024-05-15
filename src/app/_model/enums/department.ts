export enum Department {
    IT = "IT",
    ADMIN = "ADMIN",
    HR = "HR",
    SALES = "SALES"
}
export const DepartmentMapping: Record<Department, string> = {
    [Department.ADMIN]: "ADMIN",
    [Department.HR]: "HR",
    [Department.IT]: "IT",
    [Department.SALES]: "SALES"
};