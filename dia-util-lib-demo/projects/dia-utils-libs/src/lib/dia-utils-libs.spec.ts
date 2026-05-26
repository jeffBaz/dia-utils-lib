import { TestBed } from '@angular/core/testing';
import { DiaUtilsLibsModule } from './dia-utils-libs.module';

describe('DiaUtilsLibsModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaUtilsLibsModule]
    })
    .compileComponents();
  });

  it('should compile module', () => {
    const module = TestBed.inject(DiaUtilsLibsModule);
    expect(module).toBeTruthy();
  });
});
