import { Component, signal } from '@angular/core';
import { HlmButton } from '../../../../libs/ui/button/src/lib/hlm-button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { lucideGithub, lucideLoader2, lucideGripHorizontal, lucideStar, lucideX } from '@ng-icons/lucide'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HlmButton, NgIcon, HlmIcon, CdkDrag, CdkDragHandle],
  providers: [provideIcons({ lucideGithub, lucideLoader2, lucideGripHorizontal, lucideStar, lucideX })], 
  templateUrl: './login.component.html'
})
export class LoginComponent {
  isLoading = signal(false);
  
  isFlipped = signal(false);

  rating = signal(0);
  hoverRating = signal(0);
  stars = [1, 2, 3, 4, 5];

  login() {
    this.isLoading.set(true);
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
    console.log('Nota:', this.rating());
    
    this.toggleFlip();
    this.rating.set(0);
  }
}