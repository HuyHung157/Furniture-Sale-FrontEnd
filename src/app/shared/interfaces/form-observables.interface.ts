import { FormGroup } from '@angular/forms';
import { OperatorFunction } from 'rxjs';

export class FormObservables {
  valueChanges?: (value: any, form?: FormGroup) => void;
  valueChangesPipes?: OperatorFunction<any, any>[];
  statusChanges?: (status: any, form?: FormGroup) => void;
  statusChangesPipes?: OperatorFunction<any, any>[];
}
