import {User} from "../../user/models/user";
import {Task} from "./task";

export interface TaskDialogData {
  edit: boolean;
  users: User[];
  task:Task;
}
