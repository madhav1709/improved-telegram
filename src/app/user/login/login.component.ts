import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr'
import { AppService } from './../../app.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email:any;
  public password:any;

  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastrService,
    private Cookie:CookieService
  ) { }

  ngOnInit(): void {
  }
  public goToSignUp: any = () => {

    this.router.navigate(['/sign-up']);

  } // end goToSignUp
  public signinFunction: any = () => {

    if (!this.email) {
      this.toastr.warning('enter email')


    } else if (!this.password) {

      this.toastr.warning('enter password')


    } else {

      let data = {
        email: this.email,
        password: this.password
      }
      this.appService.signinFunction(data)
        .subscribe((apiResponse) => {
          console.log(apiResponse);
          if (apiResponse.status === 200) {
            console.log(apiResponse)

             this.Cookie.set('authtoken', apiResponse.data.authToken);
            
             this.Cookie.set('receiverId', apiResponse.data.userDetails.userId);
            
             this.Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
           
             this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
            
             this.router.navigate(['/chat']);

          } else {

            this.toastr.error(apiResponse.message)
          

          }

        }, (err) => {
          this.toastr.error('some error occured')

        });

    } // end condition
  }
}
