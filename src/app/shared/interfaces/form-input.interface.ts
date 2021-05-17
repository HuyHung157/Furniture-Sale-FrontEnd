import { FormField } from './form-field.interface';
import { FormObservables } from './form-observables.interface';

export interface FormInput extends FormObservables {
  showBackArrow?: boolean;
  title?: string;
  subtitle?: string;
  summary?: string;
  fields?: FormField[];
  primaryButtonLabel?: string;
  primaryButtonMatIcon?: string;
  primaryLocalSpinnerId?: string;
  secondaryButtonLabel?: string;
  secondaryButtonMatIcon?: string;
  skipCheckInvalidForm?: boolean;
}
