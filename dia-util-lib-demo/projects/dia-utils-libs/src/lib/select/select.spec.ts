import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilsSelectComponent } from './select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

describe('UtilsSelectComponent', () => {
  let component: UtilsSelectComponent;
  let fixture: ComponentFixture<UtilsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilsSelectComponent, FormsModule, MatFormFieldModule, MatSelectModule]
    }).compileComponents();
    fixture = TestBed.createComponent(UtilsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
