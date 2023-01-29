import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from '../contract.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get username() { return this.profileForm.get('username'); }
  get password() { return this.profileForm.get('password'); }

  constructor(public contractService: ContractService,  private router: Router) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    this.contractService.toKey(this.password?.value.trim(), this.username?.value.trim())
      .then((h: string) => {
        this.contractService.sstore.state.private_key = h;
        this.contractService.sstore.state.username = this.username?.value;
        this.contractService.sstore.state.password = this.password?.value;
        this.router.navigate(['/view-secret']);
      });
  }

}
