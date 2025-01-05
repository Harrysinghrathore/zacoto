import {
  Component,
  Inject,
  inject,
  PLATFORM_ID,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../service/shared-data.service';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AgCharts } from 'ag-charts-angular';
import { NextDirective } from '../../../directives/next.directive';
import { PrevDirective } from '../../../directives/prev.directive';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AgCharts,
    NextDirective,
    PrevDirective,
    GoogleMapsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isBrowser: boolean = false;
  infoContent = 'This is San Francisco!';
  showScrollToTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Get current scroll position
    const scrollHeight = document.documentElement.scrollHeight;
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    // Show the arrow when scrolled more than 40% of the page height
    if (currentScroll > scrollHeight * 0.4) {
      this.showScrollToTop = true;
    } else {
      this.showScrollToTop = false;
    }
  }

  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    draggable: true,
    scrollwheel: true,
  };

  markers: Array<{ position: google.maps.LatLngLiteral }> = [];

  // markerOptions: google.maps.MarkerOptions = {
  //   icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  //   label: { color: 'blue', text: 'San Francisco' },
  // };

  clientLogos: string[] = [ 'Lead Velocity.svg', 'Matthews.svg', 'Partly Bargains.svg', 'Shee.svg',  'Horse.svg','Truffexquise.svg', 'B2B hygiene.svg','Eric Maire Establishments.svg'];

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 2;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      this.markers = [
        // New York (Distributed across districts)
        { position: { lat: 40.7128, lng: -74.006 } }, // New York City, NY (New York State)
        { position: { lat: 40.7357, lng: -74.1724 } }, // Newark, NJ (New Jersey)
        { position: { lat: 41.3083, lng: -72.9279 } }, // New Haven, CT (Connecticut)
        { position: { lat: 42.3601, lng: -71.0589 } }, // Boston, MA (Massachusetts)
        { position: { lat: 39.9526, lng: -75.1652 } }, // Philadelphia, PA (Pennsylvania)
        { position: { lat: 41.7637, lng: -72.6851 } }, // Hartford, CT (Connecticut)
        { position: { lat: 42.6526, lng: -73.7562 } }, // Albany, NY (New York State)
        { position: { lat: 38.9072, lng: -77.0369 } }, // Washington, D.C. (District of Columbia)
        { position: { lat: 43.0481, lng: -76.1474 } }, // Syracuse, NY (New York State)
        { position: { lat: 42.8864, lng: -78.8784 } }, // Buffalo, NY (New York State)

        // London (Distributed across boroughs)
        { position: { lat: 51.5074, lng: -0.1278 } }, // Westminster
        { position: { lat: 51.5155, lng: -0.0922 } }, // City of London
        { position: { lat: 51.5362, lng: -0.0951 } }, // Islington
        { position: { lat: 51.4697, lng: -0.1004 } }, // Southwark
        { position: { lat: 51.5558, lng: -0.1763 } }, // Camden

        // Tokyo (Distributed across wards)
        { position: { lat: 35.6895, lng: 139.6917 } }, // Tokyo, Japan (Tokyo Prefecture)
        { position: { lat: 34.6937, lng: 135.5023 } }, // Osaka, Japan (Osaka Prefecture)
        { position: { lat: 43.0621, lng: 141.3544 } }, // Sapporo, Japan (Hokkaido Prefecture)

        // Delhi (Distributed across areas)
        { position: { lat: 28.6139, lng: 77.209 } }, // Delhi, India (Delhi National Capital Territory)
        { position: { lat: 26.8467, lng: 80.9462 } }, // Lucknow, India (Uttar Pradesh)
        { position: { lat: 22.5726, lng: 88.3639 } }, // Kolkata, India (West Bengal)

        // Australia (Distributed across regions)
        { position: { lat: -33.8688, lng: 151.2093 } }, // Sydney
        { position: { lat: -37.8136, lng: 144.9631 } }, // Melbourne
        { position: { lat: -27.4698, lng: 153.0251 } }, // Brisbane

        // Europe (Distributed across cities)
        { position: { lat: 48.8566, lng: 2.3522 } }, // Paris
        { position: { lat: 52.52, lng: 13.405 } }, // Berlin
        { position: { lat: 41.9028, lng: 12.4964 } }, // Rome
        { position: { lat: 40.4168, lng: -3.7038 } }, // Madrid
        { position: { lat: 50.1109, lng: 8.6821 } }, // Frankfurt
      ];

      // Optionally, you can dynamically set the center of the map to the first marker.
      this.center = this.markers[0].position;
    }
  }

  router = inject(Router);
  navigationService = inject(SharedDataService);

  navigateToContact() {
    this.navigationService.setActiveLink('/contact-us');
    this.router.navigateByUrl('/contact-us');
  }

  onMarkerClick(event: google.maps.MapMouseEvent) {
    alert('Marker clicked!');
  }

  // Function to scroll back to top
  scrollToTop(): void {
    if (this.isBrowser) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}
