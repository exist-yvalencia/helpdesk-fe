export enum Status {
    NEW = "NEW",
    ASSIGNED = "ASSIGNED",
    INPROGRESS = "INPROGRESS",
    CLOSED = "CLOSED"
}

export const StatusMapping: Record<Status,string> = {
    [Status.NEW]: "NEW",
    [Status.ASSIGNED]: "ASSIGNED",
    [Status.INPROGRESS]: "INPROGRESS",
    [Status.CLOSED]: "CLOSED"
}