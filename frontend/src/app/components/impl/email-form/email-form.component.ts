import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ButtonProperties, UserDetails } from 'src/app/models/sections';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
})
export class EmailFormComponent implements OnInit {
  @Output() formSubmit: EventEmitter<UserDetails> = new EventEmitter<UserDetails>();

  form: FormGroup | undefined;

  @Output() emailFormButtonProperties: ButtonProperties | undefined;
  showProgressBar: boolean = false;
  @Output() progressBarMode: ProgressBarMode = 'indeterminate';
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
      buttonText: 'SUBMIT',
      disabled: true,
      showIcon: false,
      iconClassName: '',
      iconName: '',
    };
  }

  checkForm() {
    if(this.form && this.emailFormButtonProperties){
    if (this.form.valid) {
      this.emailFormButtonProperties.disabled = false;
    } else {
      this.emailFormButtonProperties.disabled = true;
    }
  }
  }

  formOnSubmit() {
    this.showProgressBar = true;
    if(this.form){
    this.formSubmit.emit({
      email: this.form.controls.email.value,
      companyName: this.form.controls.companyName.value,
    });
  }
  }
}
