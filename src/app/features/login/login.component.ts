  import { Component, inject, signal } from '@angular/core';
import { HlmButton } from '../../../../libs/ui/button/src/lib/hlm-button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { lucideGithub, lucideLoader2, lucideGripHorizontal, lucideStar, lucideX } from '@ng-icons/lucide'; 
import { AuthService } from '../../core/services/auth/auth';
import { EvaluationService } from '../../core/services/evaluation/evaluation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HlmButton, NgIcon, HlmIcon, CdkDrag, CdkDragHandle],
  providers: [provideIcons({ lucideGithub, lucideLoader2, lucideGripHorizontal, lucideStar, lucideX })], 
  templateUrl: './login.component.html'
})
export class LoginComponent {
  // Padrão de nomenclatura para injeções privadas (Clean Code)
  private readonly _authService = inject(AuthService);
  private readonly _evaluationService = inject(EvaluationService);

  public isLoading = signal(false);
  public isFlipped = signal(false);
  public rating = signal(0);
  public hoverRating = signal(0);
  public stars = [1, 2, 3, 4, 5];
  public feedbackText = signal('');

  public login(): void {
    this.isLoading.set(true);
    this._authService.loginWithGithub();
    
    // Fallback visual caso o redirecionamento demore
    setTimeout(() => this.isLoading.set(false), 2000);
  }

  public toggleFlip(): void {
    // Abordagem funcional do Signal (DRY)
    this.isFlipped.update(flipped => !flipped);
  }

  public setRating(star: number): void {
    this.rating.set(star);
  }

  // Método tipado para limpar o HTML
  public updateFeedback(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.feedbackText.set(target.value);
  }

  public submitReview(): void {
    this._evaluationService.submitAppEvaluation(this.rating(), this.feedbackText())
      .subscribe({
        next: () => {
          this.rating.set(0);
          this.feedbackText.set('');
          this.toggleFlip();
        },
        error: () => {
          this.toggleFlip(); // O toast global do interceptor cuidará do aviso
        }
      });
  }

  

  public simulateError(): void {
    // Delegando a responsabilidade do HTTP para o serviço (SRP)
    // Crie esse método lá no seu EvaluationService contendo o this.http.get(...)
    //this._evaluationService.simulateError(); 
  }
}
  
