import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5256';

  public loginWithGitHub(): void {
    // Redireciona o navegador para o endpoint da sua API que inicia o fluxo OAuth.
    // DICA: Altere '/api/auth/login' para a rota exata que você criou no seu .NET
    window.location.href = `${this.apiUrl}/api/auth/login`; 
  }
}