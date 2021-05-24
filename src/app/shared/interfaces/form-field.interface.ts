import { FormGroup, ValidatorFn } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormFieldInputType } from '../enums/form-field-input-type.enum';
import { FormFieldType } from '../enums/form-field-type.enum';
import { FormObservables } from './form-observables.interface';
import { TemplateRef } from '@angular/core';

export interface FormField extends FormObservables {
  key: string;

  type: FormFieldType;

  /**
   * Set `input[type]` when type is FormFieldType.INPUT
   */
  inputType?: FormFieldInputType;

  classes?: string;

  label?: string;

  labelLink?: string;

  labelOutSide?: string;

  placeholder?: string;

  minLength?: number;

  maxLength?: number;

  pattern?: string;

  /**
   * Set options for dropdown when type is FormFieldType.DROPDOWN
   */
  options?: { value: string; label: string }[];

  initValue?: any;

  validators?: ValidatorFn | ValidatorFn[] | null;

  required?: boolean;

  disabled?: boolean;

  prefix?: string;

  suffix?: string;

  hidden?: boolean;

  errors?: {
    // Type can be one of required, email, maxLength...
    type: string;
    // Message to show if error existed
    message: string;
  }[];

  icon?: string;

  /**
   * Set icon remove preview pictuire when type is FormFieldType.IMAGE_CROPPER
   */
  iconRemovePreviewPicture?: {
    iconClass?: string;
    imageSrc?: string;
  };

  iconImage?: string;

  limitImages?: number;

  multiple?: boolean;

  /**
   * Set title when type is FormFieldType.IMAGE_CROPPER
   * Disable picture management when type is FormFieldType.IMAGE_CROPPER
   */
  title?: string;

  disablePictureManagement?: boolean;

  maxrows?: number;

  /**
   * set aspect ratio image
   */
  aspectRatio?: {
    ratioWidth?: number;
    ratioHeight?: number;
  };

  /**
   * Set group radio-buttons
   */
  groupRadio?: { value: string; label: string; disabled?: boolean }[];

  /**
   * Whether the direction for radio-buttons. Defaults to 'row'
   */
  flexDirection?: 'column' | 'row';

  /**
   * Templaet Ref
   */
  templateRef?: TemplateRef<any>;

  /**
   * Use in case of FormFieldType.ROW
   */
  fields?: FormField[];

  changeEvent?: ($event, form?: FormGroup) => void;

  click?: () => void;

  /**
   * Use in case of FormFieldType.AUTOCOMPLETE
   */
  autocompleteSearchChanged?: (
    value: string,
    field?: FormField,
    form?: FormGroup
  ) => void;

  /**
   * Use in case of FormFieldType.AUTOCOMPLETE
   */
  autocompleteOptionSelected?: (
    event: MatAutocompleteSelectedEvent,
    form?: FormGroup
  ) => void;

  /**
   * Use in case of FormFieldType.ADDRESS_AUTOCOMPLETE
   */
  // addressChanged?: (
  //   place: google.maps.places.PlaceResult,
  //   form?: FormGroup
  // ) => void;

  /**
   * Use in case on handle icon FormFieldType.PASSWORD & add icon
   */
  handleIcon?: (field?: any) => void;

  /**
   * Use in case of FormFieldType.CHECKBOX have link in label
   */
  linkClicked?: () => void;
}
