import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    host = environment.api;

    constructor(private http: HttpClient) {
    }

    login(data) {
        if (((data.login === "user") && (data.password === "passer123")) || ((data.login === 'AADiatta') && (data.password === 'passer123'))) {
            return true;
        } else {
            return false;
        }
    }

    login1(data): Observable<any> {
        const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
        return this.http.post(this.host + 'ConnectUserByCredential', data, {'headers': headers});
    }

    getUserDetail(element): Observable<any> {
        return this.http.get(this.host + 'GetUserByLogin/' + element);
    }

//   loginAuth(data){
//     let nativeCall= this.nativehttp.post(this.host+'ConnectUserByCredential',data,{
//       'Content-Type':'application/json'
//     })
//   }

    changePwd(data) {
        const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
        return this.http.post(this.host + 'ChangeUserPwdById', data, {'headers': headers})
    }

    updateUser(data) {
        const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
        return this.http.post(this.host + 'UpdateUser', data, {'headers': headers})
    }
}

