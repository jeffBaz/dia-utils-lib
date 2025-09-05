import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaUtilsLibs } from './dia-utils-libs';

describe('DiaUtilsLibs', () => {
  let component: DiaUtilsLibs;
  let fixture: ComponentFixture<DiaUtilsLibs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaUtilsLibs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaUtilsLibs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
