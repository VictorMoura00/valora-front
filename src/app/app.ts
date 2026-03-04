import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmToaster } from '../../libs/ui/sonner/src/lib/hlm-toaster';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HlmToaster],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('valora-front');
}