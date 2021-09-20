import { ConfigService } from './../../service/config.service'
import { UserWithAddress } from './../../model/user';
import { Observable } from 'rxjs';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller, Location } from '@angular/common';

@Component({
  selector: 'userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {

  private userId: string = ""
  public userDetail$:  Observable<UserWithAddress> = this.userService.getByID(this.route.snapshot.params.id)
  public selectedUser: any={}
  public imgUrl=  `${this.configService.backendUrl}/img/avatar/`

  constructor( private userService: UserService,
               private route: ActivatedRoute,
               private router : Router,
               private location: Location,
               private configService: ConfigService) { }

  ngOnInit(): void {
     this.userId = this.route.snapshot.params.id
    this.userDetail$.subscribe(user=>
      this.selectedUser = user
      )
    }


  deleteUser( ): void{
    this.userService.delete(this.userId).subscribe()
    // this.location.back()
    this.router.navigateByUrl("/users")
  }
  redirect(){
    console.log("redirect");
    this.router.navigateByUrl(`userupdate/${this.userId}`)
  }


}
