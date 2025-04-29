import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeReceitasComponent } from './home-receitas.component';

describe('HomeReceitasComponent', () => {
  let component: HomeReceitasComponent;
  let fixture: ComponentFixture<HomeReceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeReceitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
