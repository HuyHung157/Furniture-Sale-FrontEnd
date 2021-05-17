import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActionEnum } from '../../enums/action.enum';
import { FormField } from '../../interfaces/form-field.interface';
import { Layouts, ResponsiveLayoutService } from '../../services/responsive-layout.service';
import { Subscribable } from '../base-component/subscribable';
import { ImageCropperDialogComponent } from '../image-cropper-dialog/image-cropper-dialog.component';
import { FavieImageTemp, ImageUploaderComponent } from '../image-uploader/image-uploader.component';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent extends Subscribable {
  @Input() field: FormField;
  @Input() formInitValues;
  @Input() allowEditPicture: boolean;

  @Output() imageAfterCropper: EventEmitter<any> = new EventEmitter();

  @ViewChild('imageUploader') imageUploader: ImageUploaderComponent;

  public cropperImagesPreview = [];

  private currentLayout;

  constructor(
    private readonly dialog: MatDialog,
    private readonly responsiveLayoutService: ResponsiveLayoutService
  ) {
    super();
  }

  public get canUpload() {
    if (this.allowEditPicture) {
      return this.allowEditPicture;
    }
    return this.cropperImagesPreview.length < this.field?.limitImages;
  }

  public setImagesChange(image: FavieImageTemp[]) {
    if (!image.length) {
      return;
    }

    // TODO: STEVEN: Refactor image-cropper
    this.imageUploader.remove(0);
    let dialogConfig = new MatDialogConfig();
    if (!this.currentLayout || this.currentLayout === Layouts.MOBILE) {
      dialogConfig = {
        maxWidth: '600px',
        minWidth: '450px',
        disableClose: true,
        data: { image: image[0], title: this.field.title },
      };
    } else {
      dialogConfig = {
        maxWidth: '600px',
        minWidth: '450px',
        disableClose: true,
        data: {
          image: image[0],
          title: this.field?.title,
          aspectRatio: this.field?.aspectRatio,
        },
      };
    }

    const dialogRef = this.dialog.open(
      ImageCropperDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      if (result.action === ActionEnum.CONFIRM) {
        if (result.data) {
          const srcImage = result.data.src;
          image[0].file = result.data.file;
          image[0].src = srcImage;

          if (this.field?.limitImages > 1) {
            this.cropperImagesPreview.push(image[0]);
          } else if (this.field?.limitImages === 1) {
            this.cropperImagesPreview = image;
          }

          this.imageAfterCropper.next(this.cropperImagesPreview);
        }
      } else {
      }
    });
  }

  public remove(index: number) {
    if (this.cropperImagesPreview || this.cropperImagesPreview.length > 0) {
      this.imageUploader.remove(0);
      this.cropperImagesPreview = this.cropperImagesPreview.filter(
        (value, i) => i !== index
      );
      this.imageAfterCropper.next(this.cropperImagesPreview);
    }
  }

  public getIconClass() {
    return (
      this.field?.iconRemovePreviewPicture?.iconClass || 'icon-cancel-circle'
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formInitValues && changes.formInitValues.currentValue) {
      this.initForm();
    }
  }

  onInit() {
    this.initForm();

    this.subscribe(
      this.responsiveLayoutService.getCurrentLayout(),
      (layout) => {
        this.currentLayout = layout;
      }
    );
  }

  private initForm() {
    if (this.formInitValues) {
      const initImages = this.formInitValues[this.field.key];
      if (initImages && initImages.length > 0) {
        this.cropperImagesPreview = initImages
          .filter((v) => v.src)
          .map((v) => ({ src: v.src }));
      }
    }
  }
}
