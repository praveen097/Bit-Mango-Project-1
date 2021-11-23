import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
})
export class EmailFormComponent implements OnInit {
  @Output() formSubmit: EventEmitter<Object> = new EventEmitter<Object>();

  @Input() formProperties: any;

  form!: FormGroup;
  emailFormButtonProperties: any;
  showProgressBar: boolean = false;
  progressBarProperties = {
    mode: 'indeterminate',
    value: null,
  };
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      companyName: [null, [Validators.required]],
    });
    this.emailFormButtonProperties = {
      className: 'submitUserDetails',
      type: 'submit',
      buttonText: 'SUBMIT',
      disabled: true,
      showIcon: false,
    };
  }

  checkForm() {
    console.log('checkimg');
    if (this.form.valid) {
      this.emailFormButtonProperties.disabled = false;
    } else {
      this.emailFormButtonProperties.disabled = true;
    }
  }

  formOnSubmit() {
    this.showProgressBar = true;
    this.formSubmit.emit({
      email: this.form.controls.email.value,
      companyName: this.form.controls.companyName.value,
    });
  }
}
