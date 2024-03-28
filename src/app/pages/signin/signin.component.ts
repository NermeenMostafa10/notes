import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  apiError:string="";
  isLoading:boolean=false
  constructor(private _authService:AuthService , private _router:Router ){}

 loginForm:FormGroup=new FormGroup({
  name:new FormControl("",[Validators.required,Validators.minLength(3)]),
  email:new FormControl("",[Validators.required,Validators.email]),
  password:new FormControl("",[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{5,16}$/)]),
  age:new FormControl("",[Validators.required,Validators.pattern(/^01[0125][0-9]{8}&/)]),
  phone:new FormControl("",[Validators.required]),
 })
//  /^[A-Z][a-z0-9]{3,12}&/
 handleLogin(form:FormGroup){
console.log(form);
 this.isLoading=true
this._authService.handelSiginin(form.value).subscribe(
  { next:(res)=>{ console.log(res);
    if(res.msg === "done"){
      localStorage.setItem('token','3b8ny__'+res.token)
       this._authService.setUserToken();
      this._router.navigate(['notes'])
    }

  },
  error:(err)=>{this.apiError=err.error.msg
  }
 
  }
  
  )

 }



}

