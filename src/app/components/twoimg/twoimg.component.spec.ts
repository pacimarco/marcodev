import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoimgComponent } from './twoimg.component';

describe('TwoimgComponent', () => {
  let component: TwoimgComponent;
  let fixture: ComponentFixture<TwoimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoimgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
