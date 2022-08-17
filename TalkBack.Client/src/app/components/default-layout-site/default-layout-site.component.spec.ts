import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutSiteComponent } from './default-layout-site.component';

describe('DefaultLayoutComponent', () => {
  let component: DefaultLayoutSiteComponent;
  let fixture: ComponentFixture<DefaultLayoutSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultLayoutSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultLayoutSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
