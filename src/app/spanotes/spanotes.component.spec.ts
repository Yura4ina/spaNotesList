import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpanotesComponent } from './spanotes.component';

describe('SpanotesComponent', () => {
  let component: SpanotesComponent;
  let fixture: ComponentFixture<SpanotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpanotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpanotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
