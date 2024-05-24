import {inject, Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  User,
  Auth,
  signInWithEmailAndPassword, createUserWithEmailAndPassword
} from '@angular/fire/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private fireauth: Auth = inject(Auth)
  constructor( private router : Router) { }


  login(email: string, password: string) {
    signInWithEmailAndPassword(this.fireauth, email, password).then(res => {
      localStorage.setItem('token', 'true');
        this.router.navigate(['/home']);
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['login']);
    });
  }

  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.fireauth, email, password).then(res => {
      alert('Registration Successful');
      this.router.navigate(['login']);
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    }).catch(err => {
      alert(err.message);
    });
  }

}
