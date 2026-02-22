import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {

  tasks: Task[] = [];

  // Default columns (cannot delete)
  defaultColumns: string[] = ['New Task', 'In Progress', 'Completed', 'Delivered'];

  // Custom columns (can delete)
  customColumns: string[] = [];

  get columns(): string[] {
    return [...this.defaultColumns, ...this.customColumns];
  }

  showModal = false;
  showColumnModal = false;
  isEditing = false;

  newColumnName: string = '';

  newTask: Task = this.getEmptyTask();

  getEmptyTask(): Task {
    return {
      id: 0,
      title: '',
      description: '',
      priority: 'Low',
      status: 'New Task',
      date: ''
    };
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.isEditing = false;
    this.newTask = this.getEmptyTask();
  }

  saveTask() {
    if (!this.newTask.title.trim()) return;

    if (this.isEditing) {
      const index = this.tasks.findIndex(t => t.id === this.newTask.id);
      if (index !== -1) {
        this.tasks[index] = { ...this.newTask };
      }
    } else {
      this.newTask.id = Date.now();
      this.tasks.push({ ...this.newTask });
    }

    this.closeModal();
  }

  editTask(task: Task) {
    this.newTask = { ...task };
    this.isEditing = true;
    this.showModal = true;
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  openColumnModal() {
    this.showColumnModal = true;
  }

  closeColumnModal() {
    this.showColumnModal = false;
    this.newColumnName = '';
  }

  saveColumn() {
    const name = this.newColumnName.trim();
    if (!name) return;

    if (this.columns.includes(name)) return;

    this.customColumns.push(name);
    this.closeColumnModal();
  }

  deleteColumn(columnName: string) {
    this.customColumns = this.customColumns.filter(col => col !== columnName);
    this.tasks = this.tasks.filter(task => task.status !== columnName);
  }

  isCustomColumn(columnName: string): boolean {
    return this.customColumns.includes(columnName);
  }

  logout() {
    alert("Logged out successfully!");
  }

}
