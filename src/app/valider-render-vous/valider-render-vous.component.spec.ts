import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderRenderVousComponent } from './valider-render-vous.component';

describe('ValiderRenderVousComponent', () => {
  let component: ValiderRenderVousComponent;
  let fixture: ComponentFixture<ValiderRenderVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderRenderVousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderRenderVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
