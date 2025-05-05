import { Component, OnInit  } from '@angular/core';
import { DashboardService, SaldoTotalResponse  } from './../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  saldoTotal: number = 0;
  totalReceitas: number = 0;
  saldoManual: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getSaldoTotal().subscribe((data: SaldoTotalResponse) => {
      this.totalReceitas = data.totalReceitas;
      this.saldoManual = data.totalSaldoManual;
      this.saldoTotal = data.saldoTotal;
    });
  }
}
