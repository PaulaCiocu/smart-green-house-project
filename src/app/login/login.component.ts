import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Auth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthService} from "../_service/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email : string = '';
  password : string = '';

  constructor(private router:Router, private authfire: AuthService ) { }


  login() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }
    this.authfire.login(this.email,this.password);
    this.email = '';
    this.password = '';

  }
  logout(){
    this.authfire.logout();
  }


}
