import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsingleComponent } from './chatsingle.component';

describe('ChatsingleComponent', () => {
  let component: ChatsingleComponent;
  let fixture: ComponentFixture<ChatsingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatsingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
