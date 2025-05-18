import { Component, OnInit } from '@angular/core';
import { SaldoTotalResponse } from '../../../models/saldo-total-response';
import { DashboardService } from './../../../services/dashboard.service';
import { ReceitasService } from './../../../services/receitas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  valorTotal = 0;
  totalReceitas = 0;
  totalDespesas = 0;
  atualizadoEm: Date | null = null;

  constructor(private dashboardService: DashboardService,  private receitasService: ReceitasService ) {}

  ngOnInit(): void {
    this.dashboardService
      .getResumoFinanceiro()
      .subscribe((data: SaldoTotalResponse) => {
        this.valorTotal = data.valorTotal;
        this.totalDespesas = data.totalDespesas;
        this.atualizadoEm = new Date(data.atualizadoEm);
      });


     this.receitasService.listarReceitas().subscribe({
  next: (valor: number) => {
    console.log('TOTAL RECEITAS:', valor); // ver se está vindo
    this.totalReceitas = valor;
  },
  error: (err) => {
    console.error('Erro ao buscar total de receitas', err);
  }
});
  }
}
