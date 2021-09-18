import { ConfigService } from './../../service/config.service';
import { UserWithAddress } from './../../model/user';
import { Observable } from 'rxjs';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {

  private userId: string = ""
  // public userDetail$:  Observable<UserWithAddress> = this.userService.getByID(this.userId )
  public selectedUser: any={}
  public imgUrl=  `${this.configService.backendUrl}/img/avatar/`

  constructor( private userService: UserService,
               private route: ActivatedRoute,
               private configService: ConfigService) { }

  ngOnInit(): void {
     this.userId = this.route.snapshot.params.id;
     this.userService.getByID(this.userId ).subscribe(
      res => this.selectedUser = res,
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
     )
  }

}
