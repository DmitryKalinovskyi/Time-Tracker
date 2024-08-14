import User from "./User";
import { WorkSessionOrigin } from "./WorkSessionOrigin";

export interface WorkSession {
    id: number;
    user: User;
    startTime: Date;
    sessionOrigin: WorkSessionOrigin;
    duration: number | null;
    editedBy: User | null;
    createdAt: Date;
    lastUpdatedAt: Date;
}