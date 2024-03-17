import {TaskState} from "../../shared/enums/task-state";

export interface Task{
  id:number;
  name:string;
  description:string;
  creationDate:string;
  modificationDate:string;
  state:TaskState;
  assignedUser?: string | number;
}
