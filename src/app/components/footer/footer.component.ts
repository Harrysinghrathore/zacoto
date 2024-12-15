import { Component, inject  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  router = inject(Router);

  openMail() {
    const recipientEmail = 'companyname@gmail.com';
    window.location.href = `mailto:${recipientEmail}`;
  }
}
