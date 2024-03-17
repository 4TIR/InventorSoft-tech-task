import {User} from "../../user/models/user";
import {TaskState} from "../../shared/enums/task-state";

export interface TaskFormData {
  id: number;
  name: string;
  description: string;
  creationDate: string | number;
  modificationDate: string | number;
  state: TaskState;
  assignedUser?: string | number;
}
