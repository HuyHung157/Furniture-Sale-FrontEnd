import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';

@Injectable({providedIn: 'root'})
export class FirebaseService {
  constructor(private storage: AngularFireStorage) { }

  public async uploadFile(file: File, pathInput?: string): Promise<string> {
    // The storage path
    const path = pathInput ? pathInput : `${Date.now()}_${file.name}`;
    // Reference to storage bucket
    const ref = this.storage.ref(path);
    // The main task
    const task: AngularFireUploadTask = this.storage.upload(path, file);
    const taskResult = await task.snapshotChanges().toPromise();
    const url = await taskResult.ref.getDownloadURL();
    return url;
  }
}
