import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  isBrowser: boolean = false;
  showScrollToTop = false;
  contactExt: any;
  selectedCountryCode: string = '';

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.contactForm = new FormGroup({
      fullName: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        this.functiocustomEmailValidator(),
      ]),
      contactNo: new FormControl('', [this.contactNumberValidator()]),
      websiteUrl: new FormControl('', [
        Validators.required,
        this.websiteUrlValidator(),
      ]),
      sourceMedium: new FormControl('', [Validators.required]),
      message: new FormControl(),
    });
  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    const inputElement = document.querySelector('#phone') as HTMLInputElement;
    if (inputElement) {
      this.loadUtilsScript().then(() => {
        this.contactExt = intlTelInput(inputElement, {
          initialCountry: 'US',
          separateDialCode: true,
        });
      });
    }
  }

  loadUtilsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js';
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error('Failed to load utils.js script'));
      document.body.appendChild(script);
    });
  }

  functiocustomEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailPattern =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
      const value = control.value;
      if (!value) {
        return null;
      }
      const isValid = emailPattern.test(value);
      return isValid ? null : { invalidEmail: true };
    };
  }

  isemailInvalid() {
    if (
      this.contactForm.get('email')?.invalid &&
      this.contactForm.get('email')?.touched
    ) {
      return (
        this.contactForm.get('email')?.errors?.['required'] ||
        this.contactForm.get('email')?.errors?.['invalidEmail']
      );
    } else {
      return false;
    }
  }

  contactNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null; // It's optional, so if it's empty, it's valid
      }
      const isValid = /^\d{10}$/.test(value);
      return isValid ? null : { invalidContactNumber: true };
    };
  }

  isContactNumberInvalid() {
    return (
      this.contactForm.get('contactNo')?.invalid &&
      this.contactForm.get('contactNo')?.touched
    );
  }

  websiteUrlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const urlPattern =
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
      const value = control.value;
      if (!value) {
        return null;
      }
      const isValid = urlPattern.test(value);
      return isValid ? null : { invalidUrl: true };
    };
  }

  isWebsiteInvalid() {
    return (
      this.contactForm.get('websiteUrl')?.invalid &&
      this.contactForm.get('websiteUrl')?.touched
    );
  }

  isSourceMediumInvalid() {
    return (
      this.contactForm.get('sourceMedium')?.invalid &&
      this.contactForm.get('sourceMedium')?.touched
    );
  }

  onPhoneInputBlur() {
    this.selectedCountryCode =
      this.contactExt.getSelectedCountryData().dialCode;
  }

  submit() {
    //alert('Response sent successfully. Wait to hear back from us');
    if (this.contactForm.valid) {
      const hiddenForm = document.forms.namedItem('contact') as HTMLFormElement;
      (hiddenForm.elements.namedItem('name') as HTMLInputElement).value =
        this.contactForm.value.fullName;
      (hiddenForm.elements.namedItem('email') as HTMLInputElement).value =
        this.contactForm.value.email;
      (hiddenForm.elements.namedItem('contactno') as HTMLInputElement).value =
       '+' + this.selectedCountryCode + ' ' + this.contactForm.value.contactNo;
      (hiddenForm.elements.namedItem('websiteurl') as HTMLInputElement).value =
        this.contactForm.value.websiteUrl;
      (
        hiddenForm.elements.namedItem('sourcemedium') as HTMLInputElement
      ).value = this.contactForm.value.sourceMedium;
      (hiddenForm.elements.namedItem('message') as HTMLInputElement).value =
        this.contactForm.value.message;
      hiddenForm.submit();
    }
    this.contactForm.reset();
  }

  scrollToTop(): void {
    if (this.isBrowser) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}
