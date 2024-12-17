import User from "./User.ts";
import { WorkSessionOrigin } from "./WorkSessionOrigin.ts";

export interface WorkSession {
    id: number;
    startTime: string;
    endTime: string | null;
    duration: number | null;
    createdAt: string;
    lastUpdatedAt: string;
    user: User;
    editedBy: User | null;
    sessionOrigin: WorkSessionOrigin;
}