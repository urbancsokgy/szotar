import { AddressService } from './../../service/address.service';
import { Location } from '@angular/common';
  import { Component, OnInit } from '@angular/core';
  import { NgForm } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { UserService } from 'src/app/service/user.service';
import { Address } from 'src/app/model/address';

  @Component({
    selector: 'app-userupdate',
    templateUrl: './userupdate.component.html',
    styleUrls: ['./userupdate.component.scss']
  })
  export class UserupdateComponent implements OnInit {
    inputType: string = 'password';
    public userUpdate: any = {}

    public firstPassword: string = ''
    public passwordRetype: string = ''
    public passwordCheckFlag: boolean = false
    public passwordErrorFlag: boolean = false
    public urlParam: string | null = ''
    fileToUpload: File | null = null;
    currentAddressId = ""


    constructor(private route: ActivatedRoute,
                private addressService : AddressService,
                private userService: UserService,
                private router: Router,
                private location: Location ) {}

    ngOnInit(): void {
      this.urlParam = this.route.snapshot.paramMap.get("id")
      console.log(this.urlParam);
      this.userUpdate.role='user'
      this.userService.getByID(this.urlParam || "").subscribe((user) => {
          let address = user.address
          this.userUpdate = Object.assign(user, address)
          // delete this.userUpdate.address
          delete this.userUpdate.avatar
          delete this.userUpdate.password

          this.currentAddressId = this.userUpdate.address._id
        })
    }

    handleFileInput(files: FileList | null) {
      files!=null? this.fileToUpload = files.item(0): ''
      console.log("this.fileupload",this.fileToUpload);
  }
    // Át kell írni
    submit(form: NgForm){
      delete form.value.passwordRetype
      const formData: FormData = new FormData();
      this.fileToUpload!=null? formData.append('avatar', this.fileToUpload, this.fileToUpload.name): ''
      for ( let key in form.value ) {
        formData.append(key, form.value[key]);
      }
      this.userService.update(this.urlParam as string, formData).subscribe()
      let updateAddress : Address = {
        country : form.value.country,
        city : form.value.city,
        street : form.value.street,
        zip : form.value.zip,
        building : form.value.building
      }

        this.addressService.update(this.currentAddressId, updateAddress).subscribe()

        this.router.navigateByUrl(`/userdetail/${this.urlParam}`)
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

