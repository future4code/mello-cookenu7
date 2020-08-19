import { v4 } from "uuid";

export class idGenerator {
    public generateId(): string {
        return v4();
    }
}