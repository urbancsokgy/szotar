import { Address } from './../../model/address';
import { UserService } from './../../service/user.service';
import { UserWithAddress } from './../../model/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, of, Subject, Subscription } from 'rxjs';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  flatMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  inputType: string = 'password';
  public newUser: any = {};

  public firstPassword: string = '';
  public passwordRetype: string = '';
  public passwordCheckFlag: boolean = false;
  public passwordErrorFlag: boolean = false;
  public urlParam: string | null = '';
  fileToUpload: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.urlParam = this.route.snapshot.paramMap.get('add');
    console.log(this.urlParam);
    this.newUser.active = true;
    this.newUser.role = 'user';
    this.newUser.country = 'Magyarország';
  }

  handleFileInput(files: FileList | null) {
    files != null ? (this.fileToUpload = files.item(0)) : '';
    console.log('this.fileupload', this.fileToUpload);
  }
  submit(form: NgForm) {
    delete form.value.passwordRetype;
    const formData: FormData = new FormData();
    this.fileToUpload != null
      ? formData.append('avatar', this.fileToUpload, this.fileToUpload.name)
      : '';
    for (let key in form.value) {
      formData.append(key, form.value[key]);
    }
    console.log(formData);
    this.userService.createWithAddress(formData).subscribe();
    this.urlParam == 'add'? this.location.back(): this.router.navigateByUrl(`/home`)
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
    this.firstPassword = first;
    this.firstPassword == retype
      ? (this.passwordCheckFlag = true)
      : (this.passwordCheckFlag = false);
    !this.passwordCheckFlag
      ? (this.passwordErrorFlag = true)
      : (this.passwordErrorFlag = false);
  }
}
