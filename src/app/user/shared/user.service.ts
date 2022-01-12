import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { UpdateUserPayload } from '../profile/Update-User.payload';
import { UserResponse } from '../user-response.payload';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<UserResponse> {
    //Observable<my_interface_payload>
    return this.http.get<UserResponse>(
      `http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/user/username/${username}`
    );
  }

  updateUser(updatePayload: UpdateUserPayload): any {
    return this.http.post(
      `http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/user/update`,
      updatePayload
    );
  }
}
