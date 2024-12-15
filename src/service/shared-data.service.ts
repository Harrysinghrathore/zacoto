import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  private activeLinkSource = new BehaviorSubject<string>('/');
  activeLink$ = this.activeLinkSource.asObservable();

  setActiveLink(link: string) {
    this.activeLinkSource.next(link);
  }
}
