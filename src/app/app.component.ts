import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  RouterModule,
} from '@angular/router'; // Routing
import { Component } from '@angular/core'; // Component decorator
import { CommonModule } from '@angular/common'; // Common module (per pipe, ngIf, ngFor, ecc.)
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon'; // Material Icon module
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Spinner
import { MatCardModule } from '@angular/material/card'; // Material Card module
import { MatButtonModule } from '@angular/material/button'; // Material Button module
import { ReactiveFormsModule } from '@angular/forms'; // Reactive Forms Module
import { UserService } from './user.service'; // Servizi specifici dell'app

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  providers: [UserService, localProvideHttpClient()],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'elenco-utenti';
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigazione in corso...');
        // Mostra lo spinner quando la navigazione inizia
        this.loading = true;
      }
      if (event instanceof NavigationEnd || event instanceof NavigationError) {
        // Nascondi lo spinner quando la navigazione termina o c'è un errore
        this.loading = false;
      }
    });
  }
}

function localProvideHttpClient(): import('@angular/core').Provider {
  // Provide HttpClient implementation here
  return { provide: 'HttpClient', useClass: HttpClient };
}
