import { Injectable, inject } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular'; // Importando com alias para não dar conflito de nome

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // Injeta o maestro do Auth0
  private readonly _auth0 = inject(Auth0Service);

  public loginWithGitHub(): void {
    this._auth0.loginWithRedirect({
      authorizationParams: {
        connection: 'github' // Opcional: Pula a tela de login do Auth0 e vai direto pro GitHub!
      }
    });
  }
}