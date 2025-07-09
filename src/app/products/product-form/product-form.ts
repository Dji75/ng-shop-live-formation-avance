import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

const customValidator = (control: AbstractControl): ValidationErrors | null => {
  return control.value === 'ok' ? null : { youFail: true, message: `your message failed to validate: ${control.value}` }
}

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductForm implements OnInit {
  private readonly fb = inject(FormBuilder);

   // '<product [test]="'coucou'" [test1]="true" (onDeleteClick)="delete($event)"></product>
   //  @Input() test = 'coucou';
   //  @Input() test1 : boolean;
   //  @Output() onDeleteClick = new EventEmitter<{ reason: string }>();

  protected readonly productForm = this.fb.nonNullable.group({
    emails: this.fb.nonNullable.array([this.fb.nonNullable.control<string>('', [Validators.required, Validators.email])]),
  });

  protected readonly dynamicForm = this.fb.nonNullable.group({});

  protected readonly config = [
    { name: 'username', validators: [Validators.required] },
    { name: 'age', validators: [Validators.min(18)] }
  ];

  get emailControl() {
    return this.productForm.get('emails') as FormArray<FormControl<string>>;
  }


  ngOnInit(): void {
    //this.emailControl.push(...);

    this.config.forEach((field) => {
      this.dynamicForm.addControl(field.name, this.fb.nonNullable.control('', [...field.validators, customValidator]), { emitEvent: false });
    });
  }

  hasFieldOnError(fieldName: string): boolean {
    console.log('appellé !', fieldName);
    return !!this.dynamicForm.get(fieldName)?.touched && !!this.dynamicForm.get(fieldName)?.errors
  }

}
