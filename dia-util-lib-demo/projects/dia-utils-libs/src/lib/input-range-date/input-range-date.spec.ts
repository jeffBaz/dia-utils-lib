import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRangeDate } from './input-range-date';

describe('InputRangeDate', () => {
  let component: InputRangeDate;
  let fixture: ComponentFixture<InputRangeDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputRangeDate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputRangeDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
