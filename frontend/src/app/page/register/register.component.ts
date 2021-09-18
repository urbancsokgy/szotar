import { UserWithAddress } from './../../model/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, of, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, flatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  inputType: string = 'password';
  public newUser: any = {};

  public firstPassword: string = ''
  public passwordRetype: string = ''
  public passwordCheckFlag: boolean = false
  public passwordErrorFlag: boolean = false

  constructor() {}

  ngOnInit(): void {
  }
  submit(form: NgForm){
    console.log(form.value);
  }

  setShowHide() {
    return this.inputType === 'password'
      ? (this.inputType = 'text')
      : (this.inputType = 'password');
  }
  setPassword(data: string) {
    this.firstPassword = data;
  }
  checkPassword(first: string, retype: string) {
    this.firstPassword = first
    this.firstPassword == retype? this.passwordCheckFlag = true : this.passwordCheckFlag = false
    !this.passwordCheckFlag? this.passwordErrorFlag = true : this.passwordErrorFlag = false
  }

}
