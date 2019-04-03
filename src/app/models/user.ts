export interface Roles{
    admin: string;
 }
 
 export interface userInterface{
    id?: string;
    name?: string;
    email?: string;
    pass?: string;
    active?: string;
    roles: Roles;
    enable?: boolean;
    dir?: string;
 }
 