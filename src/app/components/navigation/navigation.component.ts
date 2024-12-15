import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../../service/shared-data.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {

  navigationService = inject(SharedDataService);

  navObj: any = [
    {
      page: 'Home',
      navigateTo: '/',
      active: true,
    },
    {
      page: 'Contact',
      navigateTo: '/contact-us',
      active: false,
    },
  ];
  menuActive = false;
  router = inject(Router);

  ngOnInit(){
    this.navigationService.activeLink$.subscribe((link) => {
      this.navObj.forEach((element:any) => {
        element.active = element.navigateTo === link;
      });
    });
  }

  navigate(url: string) {
    // Deactivate all nav items
    this.navObj.forEach((element: any) => {
      element.active = false;
    });

    // Activate the selected nav item
    const selectedNavItem = this.navObj.find((ele: any) => ele.navigateTo === url);
    if (selectedNavItem) {
      selectedNavItem.active = true;
    }

    // Navigate to the selected route
    this.router.navigateByUrl(url);

    // Close the menu (collapse the navbar) on mobile view
    this.menuActive = false;
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }
}
