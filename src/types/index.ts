export type User = {
    id: number;
    name: string;
    email: string;
};

export enum ActionTypes {
    CREATED = 'created',
    UPDATED = 'updated',
    DELETED = 'deleted',
    ERROR = 'error',
}
