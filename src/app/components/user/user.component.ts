import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user?: User | null;

  constructor(private srv: UserService) {}

  ngOnInit(): void {
      this.srv.getUser().subscribe(user => {
        this.user = user;
      });

  }
}
