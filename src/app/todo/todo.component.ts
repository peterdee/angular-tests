import { Component, OnInit } from '@angular/core';
import { TodoModel } from "../models/TodoModel";
import { TodoService } from "../services/TodoService";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  public fetchedList: TodoModel[];
  public todoList: TodoModel[];
  public todoText: String = null;

  constructor(private TodoService: TodoService) {

  }

  ngOnInit() {
    this.todoList = this.TodoService.getTodos();
    this.TodoService.fetchTodos().then((data: TodoModel[]) => {
      this.fetchedList = data;
    });
  }

  createTodo() {
    this.TodoService.addTodo(this.todoText);
    this.todoText = null;
  }

  removeTodo(index: number) {
    this.TodoService.removeTodo(index);
  }
}
