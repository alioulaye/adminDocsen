import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerMotPasseComponent } from './editer-mot-passe.component';

describe('EditerMotPasseComponent', () => {
  let component: EditerMotPasseComponent;
  let fixture: ComponentFixture<EditerMotPasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditerMotPasseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerMotPasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
