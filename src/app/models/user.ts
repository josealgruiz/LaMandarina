export interface Roles{
    admin: boolean;
}

export interface userInterface{
    id?: string;
    name?: string;
    email?: string;
    pass?: string;
    roles: Roles; 
}