import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from "@angular/platform-browser";

import { TodoComponent } from './todo.component';
import { TodoModel } from "../models/TodoModel";
import { TodoService } from "../services/TodoService";
import { createChangeDetectorRef } from '@angular/core/src/view/refs';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoComponent ],
      imports: [ FormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Todo component', () => {
    expect(component).toBeTruthy();
  });

  it('should render submit button with the "submit-button" class and with the "Add Todo" text', () => {
    const fixture = TestBed.createComponent(TodoComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.submit-button').textContent).toContain('Add Todo');
  });

  it("should get the todoList from the TodoService", () => {
    const service = fixture.debugElement.injector.get(TodoService);
    fixture.detectChanges();
    expect(service.getTodos()).toEqual(component.todoList);
  });

  it("should have no Todo items after the initial start", () => {
    const service = fixture.debugElement.injector.get(TodoService);
    fixture.detectChanges();
    expect(service.getTodos().length).toBe(0);
  });

  it("should create a new Todo item", () => {
    const testText = "This is a test"
    component.todoText = testText;
    fixture.detectChanges();

    // emulate adding Todo item
    const button = fixture.debugElement.query(By.css(".submit-button"));
    button.triggerEventHandler("click", null);
    
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain(testText);
  });

  it("should disable the submit button if textArea is empty", () => {
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it("should enable the submit button if textArea is not empty", () => {
    component.todoText = "This is a test";
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css("button"));
    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it("should fetch the async data", async () => {
    const fakeList = [new TodoModel("Totally not a test", "This is some date")];

    const service = fixture.debugElement.injector.get(TodoService);
    let spy = spyOn(service, "fetchTodos").and.returnValue(
      Promise.resolve(fakeList)
    );

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.fetchedList).toBe(fakeList);
    });
  });

  it("should remove the Todo item upon click", () => {
    const service = fixture.debugElement.injector.get(TodoService);
    component.todoText = "Just another Todo";
    fixture.detectChanges();

    // emulate adding Todo item
    const button = fixture.debugElement.query(By.css(".submit-button"));
    button.triggerEventHandler("click", null);

    // emulate deleting Todo item
    const item = fixture.debugElement.query(By.css("#todo-items"));
    button.triggerEventHandler("click", null);
    
    // compile and try to find the Todo item
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("#todo-items")).toBeFalsy();
  });
});
