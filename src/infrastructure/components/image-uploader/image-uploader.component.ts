import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { CommonConstant } from '../../../app/shared/constants/common.constant';

export interface ImageTemp {
  file?: File;
  src?: any;
  event?: any;
}

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {
  @Input() label: string;
  @Input() icon: string;
  @Input() iconImage: string;
  @Input() limitImages = 3;
  @Input() images: ImageTemp[] = [];
  @Input() labelOutSide: string;
  @Input() showActions = true;

  @Output() imagesChange: EventEmitter<ImageTemp[]> = new EventEmitter<
  ImageTemp[]
  >();

  @ViewChild('fileInputElement') fileInputElement: ElementRef;

  get canUpload() {
    return this.images && this.images.length < this.limitImages;
  }

  constructor(private readonly matSnackBar: MatSnackBar) {
  }

  public triggerUpload() {
    this.fileInputElement.nativeElement.click();
  }

  public remove(index: number) {
    this.images = this.images.filter((value, i) => i !== index);
    this.notifyChange();
  }

  public onUploadedFiles($event) {
    const files: File[] = $event.target.files;
    if (files.length > 1) {
      this.matSnackBar.open(
        'One file per time please!',
        null,
        CommonConstant.FAILURE_SNACKBAR_CONFIG
      );
      return;
    }

    const readFile = (file) => {
      if (file.size > environment.imageUploadMaximumFileSize) {
        this.matSnackBar.open(
          'File size must be under 3 MB!',
          null,
          CommonConstant.FAILURE_SNACKBAR_CONFIG
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        this.images.push({
          file,
          src: e.target.result,
          event: $event,
        });
        this.notifyChange();
      };
      reader.readAsDataURL(file);
    };

    if (files.length > 0) {
      readFile(files[0]);
    }
  }

  ngOnInit() {
    this.label = this.label;
  }

  private notifyChange() {
    this.imagesChange.emit(this.images);
  }
}
