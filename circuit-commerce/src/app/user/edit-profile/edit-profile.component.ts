import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { UpdateUserPayload } from '../profile/Update-User.payload';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  updateUser!: FormGroup;
  curUsername!: string;
  curFirstName!: string;
  curLastName!: string;
  curEmail!: string;
  curAddress!: string;
  updatePayload!: UpdateUserPayload;
  inEdit!: boolean;
  // prof!: ProfileComponent;



  constructor(private userServ: UserService, private formBuild: FormBuilder, private authServ: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.curUsername = this.authServ.getUsername();

    this.userServ.getUser(this.curUsername)
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

    this.updateUser = this.formBuild.group({
      newFirstName: [this.curFirstName, [Validators.required]],
      newLastName: [this.curLastName, [Validators.required]],
      newEmail: [this.curEmail, [Validators.required]],
      newAddress: [this.curAddress, [Validators.required]]
    });

    this.updatePayload = {
      username: this.curUsername,
      firstName: this.curFirstName,
      lastName: this.curLastName,
      email: this.curEmail,
      address: this.curAddress
    }
  
  } 

  update(): void {
    this.updatePayload.firstName = this.updateUser.get('newFirstName')?.value || this.curFirstName;
    this.updatePayload.lastName = this.updateUser.get('newLastName')?.value || this.curLastName;
    this.updatePayload.email = this.updateUser.get('newEmail')?.value || this.curEmail;
    this.updatePayload.address = this.updateUser.get('newAddress')?.value || this.curAddress;

    this.userServ.updateUser(this.updatePayload)
    .subscribe((data: any) => {
      this.curFirstName = this.updateUser.get('newFirstName')?.value;
      this.curLastName = this.updateUser.get('newLastName')?.value;
      this.curEmail = this.updateUser.get('newEmail')?.value;
      this.curAddress = this.updateUser.get('newAddress')?.value;
      this.router.navigateByUrl(`/user/${this.curUsername}/profile`);
    });
    
  }

}

