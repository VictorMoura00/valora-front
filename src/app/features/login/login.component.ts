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
  private authService = inject(AuthService);
  private evaluationService = inject(EvaluationService);

  isLoading = signal(false);
  isFlipped = signal(false);
  rating = signal(0);
  hoverRating = signal(0);
  stars = [1, 2, 3, 4, 5];
  feedbackText = signal('');

  login() {
    this.isLoading.set(true);
    this.authService.loginWithGithub();
    
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }

  toggleFlip() {
    this.isFlipped.set(!this.isFlipped());
  }

  setRating(star: number) {
    this.rating.set(star);
  }

  submitReview() {
    // Chama a service limpa
    this.evaluationService.submitAppEvaluation(this.rating(), this.feedbackText())
      .subscribe({
        next: (response) => {
          console.log('Avaliação salva com sucesso!', response);
          this.rating.set(0);
          this.feedbackText.set('');
          this.toggleFlip();
        },
        error: (err) => {
          console.error('Erro ao salvar avaliação. A API .NET já está rodando?', err);
          this.toggleFlip();
        }
      });
  }
}