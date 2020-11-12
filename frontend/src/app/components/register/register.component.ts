import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  returnUrl: string;
  registerForm: FormGroup;
  apiResult;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: [null, Validators.required]
    });
  }

  get controls() { return this.registerForm.controls; }

  register() {
    if (!this.registerForm.valid) {
      return;
    }

    this.userService.register(this.controls.username.value, this.controls.password.value)
      .subscribe((data: any) => {
        if (data.error) {
          this.apiResult = data;
        } else {
          this.router.navigate(['login']);
        }
      }, error => {
        this.apiResult = error;
      });
  }
}
