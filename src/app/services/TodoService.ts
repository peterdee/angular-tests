import { Injectable } from "@angular/core";
import { TodoModel } from "../models/TodoModel";

@Injectable({
  providedIn: "root"
})

export class TodoService {
  public todoList: TodoModel[] = [];

  constructor() {

  }

  addTodo(todo: String) {
    this.todoList.push(new TodoModel(todo, `${new Date()}`));
  }

  getTodos() {
    return this.todoList;
  }

  removeTodo(index: number) {
    this.todoList.splice(index, 1);
  }

  fetchTodos() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([new TodoModel('Totally not a test', 'This is some date')]);
      }, 2500);
    });
  }
}
