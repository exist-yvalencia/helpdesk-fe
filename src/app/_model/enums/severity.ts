export enum Severity {
    LOW = "LOW",
    NORMAL = "NORMAL",
    MAJOR = "MAJOR",
    CRITICAL = "CRITICAL"
}

export const SeverityMapping: Record<Severity, string> = {
    [Severity.LOW]: "LOW",
    [Severity.NORMAL]: "NORMAL",
    [Severity.MAJOR]: "MAJOR",
    [Severity.CRITICAL]: "CRITICAL"
}