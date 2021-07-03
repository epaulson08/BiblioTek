import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeyList } from 'src/app/models/local-storage-key-list';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorLoggingIn: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(form) {
    this.auth.login(form.uname.value, form.pass.value)
      .subscribe(
        data => {
          LocalStorageKeyList.clear();
          localStorage.setItem("username", form.uname.value);
          this.router.navigateByUrl("/user-dashboard");
        },

        err => {
          this.errorLoggingIn = "The credentials you provided appear to be incorrect. Please try again!";
          console.error("Error logging in: " + err);
        }
      )
  }

}
