import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarClientesSiguienteComponent } from './registrar-clientes-siguiente.component';

describe('RegistrarClientesSiguienteComponent', () => {
  let component: RegistrarClientesSiguienteComponent;
  let fixture: ComponentFixture<RegistrarClientesSiguienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarClientesSiguienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarClientesSiguienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
