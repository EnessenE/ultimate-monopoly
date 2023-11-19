import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonopolyComponent } from './monopoly.component';

describe('MonopolyComponent', () => {
  let component: MonopolyComponent;
  let fixture: ComponentFixture<MonopolyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonopolyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonopolyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
