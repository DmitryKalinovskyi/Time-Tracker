import User from "./User";
import { WorkSessionOrigin } from "./WorkSessionOrigin";

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