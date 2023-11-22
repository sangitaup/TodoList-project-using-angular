import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {
  
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateTaskStatus(task: any): Observable<any> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put(url, task);
  }

  deleteTask(id: number): Observable<any> { 
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
