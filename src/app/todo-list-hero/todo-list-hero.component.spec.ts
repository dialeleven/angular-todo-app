import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListHeroComponent } from './todo-list-hero.component';

describe('TodoListHeroComponent', () => {
  let component: TodoListHeroComponent;
  let fixture: ComponentFixture<TodoListHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
