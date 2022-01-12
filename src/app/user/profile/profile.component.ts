import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { UserService } from '../shared/user.service';
import { UpdateUserPayload } from './Update-User.payload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  curUserName!: string;

  curFirstName!: string;
  curLastName!: string;
  curEmail!: string;
  curAddress!: string;


  constructor(private userServ: UserService, private formBuild: FormBuilder, private authServ: AuthService, private router: Router) {
  }

  ngOnInit(): void {

    this.curUserName = this.authServ.getUsername();

  }

  ngAfterViewInit():void{
    this.userServ.getUser(this.curUserName)
    .subscribe((response:any) => {
      for(let detail in response){
        if(response[detail] != ""){
          if(detail == "firstName"){
            this.curFirstName = response[detail];
          } 
          else if(detail == "lastName"){
            this.curLastName = response[detail];
          }
          else if(detail == "email"){
            this.curEmail = response[detail];
          }
          else if(detail == "address"){
            this.curAddress = response[detail];
          }
        }
      }

    });
  }

  editProfile(): void {
    this.router.navigateByUrl(`/user/${this.curUserName}/edit-profile`);
  }
}

