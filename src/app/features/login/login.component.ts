import { Component } from '@angular/core';
import { HlmButton } from '../../../../libs/ui/button/src/lib/hlm-button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HlmButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent { }