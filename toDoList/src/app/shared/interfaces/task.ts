export interface ITask {
  id: number;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done';
  isCompleted: boolean;
  date: string;
}
