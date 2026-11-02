
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { templateTextService } from '@app/services/templateText.service';
import { focusFirstInvalid } from '@app/shared/form-utils';
import { MotionService } from '@app/shared/motion.service';
import { animateCards } from '@app/shared/card-motion';

interface CompanyServices {
  title: string;
  subtitle: string;
  description: string;
}

interface CostumersAndPartners {
  img: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  private stopMotion?: () => void;
  private destroyed = false;

  templateText: any = {};
  isLoading = false;

  texts: string[] = [];
  services: CompanyServices[] = [];
  costumers: CostumersAndPartners[] = [];
  partners: CostumersAndPartners[] = [];

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private templateTextService: templateTextService,
    private toastr: ToastrService,
    private host: ElementRef<HTMLElement>,
    private motion: MotionService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {

    this.templateTextService.templateText$.subscribe((data) => {
      this.templateText = data.home;

      this.services = this.templateText.Services?.list ?? [];
      this.costumers = this.templateText.Costumers?.list ?? [];
      this.partners = this.templateText.Partners?.list ?? [];
    });

    this.form = this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.minLength(3)]
      ],
      email: [
        null,
        [Validators.required, Validators.email]
      ],
      description: [
        null,
        [Validators.required, Validators.minLength(10)]
      ]
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.motion.load().then((kit) => {

        if (kit && !this.destroyed) {
          this.stopMotion = animateCards(
            kit,
            this.host.nativeElement,
            {
              cards: '#services-cards .service-card',
              icon: '.service-icon',
              tilt: false
            }
          );
        }

      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.stopMotion?.();
  }

  showError(name: string): boolean {
    const control = this.form.get(name);

    return !!control && control.touched && control.invalid;
  }

  publishTask(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      focusFirstInvalid(this.host.nativeElement);
      return;
    }

    // Modo de demonstração:
    // Nenhuma informação é enviada para servidores externos.
    this.toastr.info(
      'Formulário em demonstração. Nenhuma mensagem foi enviada.',
      'Portfólio João Paulo'
    );

  }
}
