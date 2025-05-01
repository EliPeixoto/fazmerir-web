import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home-receitas',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './home-receitas.component.html',
  styleUrl: './home-receitas.component.scss'
})
export class HomeReceitasComponent {

}
