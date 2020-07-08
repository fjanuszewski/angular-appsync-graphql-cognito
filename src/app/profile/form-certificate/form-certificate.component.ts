import { Component, OnInit, Input } from '@angular/core';
import { Cert } from '../../models/cert.model';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-form-certificate',
  templateUrl: './form-certificate.component.html'
})
export class FormCertificateComponent implements OnInit {
  @Input() cert: Cert
  @Input() modalReference:any
  orders=[1,2,3,4,5,6,7,8,9,10,11,12]
  certForm = new FormGroup({
    url: new FormControl(''),
    order: new FormControl(this.orders),
  });

  constructor() {}
  
  onChangeSelection(selected) {
    this.cert.order = parseInt(selected);
  }
  ngOnInit(): void {
    this.certForm.patchValue({
      url: this.cert.url,
      order:this.cert.order
    });
  }
}
