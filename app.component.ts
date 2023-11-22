import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TaskService],
})
export class AppComponent implements OnInit {
  title = 'todo-list';
  list: any[] = [];
  filteredList: any[] = [];
  inputEnabled: boolean = false;
  buttonEnabled: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (tasks: any[]) => {
        this.list = tasks;
        this.filteredList = [...this.list];
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  toggleInput() {
    this.inputEnabled = !this.inputEnabled;
  }

  toggleButton() {
    this.buttonEnabled = !this.buttonEnabled;
  }

  addTask(item: string, dueDate: string) {
    let dueDateObj = null;
    if (dueDate) {
      dueDateObj = new Date(dueDate);
      const formattedDueDate = dueDateObj.toISOString().split('T')[0];
      dueDateObj = formattedDueDate;
    }
    const taskData = { name: item, status: 'pending', dueDate: dueDateObj };
    this.taskService.createTask(taskData).subscribe({
      next: (task) => {
        this.list.push(task);
        this.filteredList = [...this.list];
        item = '';
        dueDate = '';
      },
      error: (error) => {
        console.error('Error creating task:', error);
      }
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.list = this.list.filter((item) => item.id !== id);
        this.filteredList = this.filteredList.filter((item) => item.id !== id);
      },
      error: (error) => {
        console.error(`Error deleting task with ID ${id}:`, error);
      }
    });
  }

  filterTask(status: string) {
    if (status === 'all') {
      this.filteredList = this.list;
    } else if (status === 'completed') {
      this.filteredList = this.list.filter((task) => task.status === 'done');
    } else if (status === 'pending') {
      this.filteredList = this.list.filter((task) => task.status === 'pending');
    }
  }

  deleteDoneTasks() {
    this.list = this.list.filter((item) => item.status === 'pending');
    this.filteredList = this.filteredList.filter((item) => item.status === 'pending');
  }

  deleteAllTasks() {
    this.list = [];
    this.filteredList = [];
  }

  doneTask(index: number) {
    this.list[index].status = 'done';
    this.taskService.updateTaskStatus(this.list[index]).subscribe({
      next: (updatedTask: any) => {
     },
      error: (error: any) => {
        console.error('Error updating task status:', error);
      }
    });
  }
}
