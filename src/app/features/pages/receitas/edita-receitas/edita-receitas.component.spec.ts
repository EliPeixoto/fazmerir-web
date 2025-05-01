import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaReceitasComponent } from './edita-receitas.component';

describe('EditaReceitasComponent', () => {
  let component: EditaReceitasComponent;
  let fixture: ComponentFixture<EditaReceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditaReceitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditaReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
