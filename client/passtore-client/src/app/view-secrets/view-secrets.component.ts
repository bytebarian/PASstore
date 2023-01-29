import { Component, OnInit } from '@angular/core';
import { ContractService } from '../contract.service';
import { Secret } from '../model/secret';

@Component({
  selector: 'app-view-secrets',
  templateUrl: './view-secrets.component.html',
  styleUrls: ['./view-secrets.component.scss']
})
export class ViewSecretsComponent implements OnInit {

  public secrets: Secret[] = [];

  constructor(public contractService: ContractService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  public async fetchData() {
    if (this.secrets.length > 0) {
      return;
    }

    if (this.contractService.getKTAddress() && this.contractService.sstore.state.private_key) {
      const secrets = await this.contractService.getSecrets(this.contractService.getKTAddress() as string);
      this.secrets = secrets.map((secret: any)=>this.contractService.decryptData(secret, this.contractService.sstore.state.private_key));
    }
  }

}
