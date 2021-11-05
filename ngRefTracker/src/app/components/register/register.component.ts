import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  newUser: User = new User();
  chosenPalette: string = '-A';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register(registerForm) {
    this.newUser.username = registerForm.uname.value;
    this.newUser.password = registerForm.pass.value;

    this.auth.register(this.newUser).subscribe(
      (data) => {
        localStorage.setItem('username', this.newUser.username);
        this.auth.login(this.newUser.username, this.newUser.password).subscribe(
          (next) => {
            this.router.navigateByUrl('/user-dashboard');
          },
          (error) => {
            console.error('RegisterComponent.register(): error logging in.');
          }
        );
      },
      (err) => {
        console.error('RegisterComponent.register(): error registering.');
        console.error(err);
      }
    );
  }
}
