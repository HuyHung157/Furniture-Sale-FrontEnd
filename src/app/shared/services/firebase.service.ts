import { Injectable, Injector } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrors } from 'src/app/util/errorPaser.util';

@Injectable({providedIn: 'root'})
export class FirebaseService {
  private toastr: ToastrService;  

  constructor(
    public afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    injector: Injector
    ) { 
      this.toastr = injector.get(ToastrService);
    }

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

  public createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    try {
      return this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }

  public signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  loginByFacebook() {
    return this.authLogin(new firebase.auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        return result;
      }).catch((error) => {
        this.toastr.error(error);
      });
  }

  requestResetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email).then(
      (result) => {
        // success, show some message
        return result;
      },
      (err) => {
        const errorMessage = FirebaseErrors.Parse(err.code);
        return errorMessage;
      }
    );
  }

  confirmResetPassword(code: string, password: string) {
    return this.afAuth.confirmPasswordReset(code, password).then(
      (res) => {
        return res;
      },
      (error) => {
        const errorMessage = FirebaseErrors.Parse(error.code);
        return errorMessage;
      }
    )
  }

}
