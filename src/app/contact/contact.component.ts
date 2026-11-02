
import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { focusFirstInvalid } from '@app/shared/form-utils';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  form: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private host: ElementRef<HTMLElement>
  ) {
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

    this.toastr.info(
      'Formulário em demonstração. Nenhuma mensagem foi enviada.',
      'Portfólio João Paulo'
    );

  }
}
