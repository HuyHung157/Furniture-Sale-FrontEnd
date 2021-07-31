import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CommonConstant } from 'src/app/shared/constants/common.constant';
import { ActionEnum } from 'src/app/shared/enums/action.enum';


@Component({
  selector: 'app-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  styleUrls: ['./image-cropper-dialog.component.scss']
})
export class ImageCropperDialogComponent implements OnInit {
  public imageChangedEvent: any;
  public aspectRatio;

  private croppedImage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: any,
    private readonly dialogRef: MatDialogRef<ImageCropperDialogComponent>,
    private matSnackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.initImage();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  loadImageFailed() {
    this.matSnackBar.open(
      'Upload failed',
      null,
      CommonConstant.FAILURE_SNACKBAR_CONFIG
    );
  }

  confirmImage() {
    try {
      fetch(this.croppedImage)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], this.data.image.file.name, {
            type: 'image/png',
          });
          this.dialogRef.close({
            action: ActionEnum.CONFIRM,
            data: { file, src: this.croppedImage },
          });
        });
    } catch {
      this.loadImageFailed();
    }
  }

  close() {
    this.dialogRef.close({ action: ActionEnum.CANCEL });
  }

  private initImage() {
    if (this.data) {
      this.imageChangedEvent = this.data.image.event;
      if (this.data?.aspectRatio) {
        this.aspectRatio =
          this.data?.aspectRatio?.ratioWidth /
          this.data?.aspectRatio?.ratioHeight;
      } else {
        this.aspectRatio = 1 / 1;
      }
    }
  }
}
