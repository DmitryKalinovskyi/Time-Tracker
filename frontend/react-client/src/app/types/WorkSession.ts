import User from "./User";
import { WorkSessionOrigin } from "./WorkSessionOrigin";

export interface WorkSession {
    id: number;
    startTime: Date;
    endTime: Date | null;
    duration: number | null;
    createdAt: Date;
    lastUpdatedAt: Date;
    user: User;
    editedBy: User | null;
    sessionOrigin: WorkSessionOrigin;
}