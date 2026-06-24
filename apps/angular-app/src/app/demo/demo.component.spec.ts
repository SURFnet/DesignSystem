import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoComponent } from './demo.component';
//import { provideZonelessChangeDetection } from '@angular/core';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [DemoComponent],
      //providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
