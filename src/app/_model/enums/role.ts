export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export const RoleMapping: Record<Role, string> = {
    [Role.ADMIN]: "ADMIN",
    [Role.USER]: "USER"
};