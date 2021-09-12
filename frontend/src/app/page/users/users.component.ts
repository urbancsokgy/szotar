import { ConfigService } from './../../service/config.service';
import { Observable } from 'rxjs';
import { User } from './../../model/user';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private users$ : Observable<User[]>= this.userService.getAll()
  public users: User[]= []
  public imgUrl=  `${this.configService.backendUrl}/img/avatar/`

  constructor( private userService: UserService,
               private configService: ConfigService
    ) { }

  ngOnInit(): void {
    this.users$.subscribe(
            res => this.dataPush(res),
            err => console.log('HTTP Error', err),
            () => console.log('HTTP request completed.')
     )
    }

    dataPush(data: User[]) :void {
      data.forEach((element, i )=> {
        const myInterval=setTimeout(() => {
          this.users.push(element)
          }
          ,i * 100)
        });
      }



}
