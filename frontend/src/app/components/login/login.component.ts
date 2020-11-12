import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loginForm: FormGroup;
  apiResult;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: [null, Validators.required]
    });
  }

  get controls() { return this.loginForm.controls; }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService.login(this.controls.username.value, this.controls.password.value)
      .pipe(first())
      .subscribe(data => {
        this.apiResult = data;
        if (!data.error) {
          this.router.navigate([this.returnUrl]);
        }
      }, error => {
        this.apiResult = error;
      });
  }
}
