import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CertsService } from '../../services/certs.service';
import { Cert } from '../../models/cert.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html'
})

export class AddCertificateComponent implements OnInit {
  @Input() employee: any
  @Output() newCert = new EventEmitter<Cert>();
  @Input() modalReference: any
  certsList: any
  certsAvailable: Cert[]
  certSelected = new Cert()
  orders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  certForm = new FormGroup({
    id: new FormControl(''),
    url: new FormControl(''),
    order: new FormControl(this.orders)
  });

  constructor(private certsService: CertsService) { }

  async ngOnInit() {
    this.certForm.patchValue({
      id: null,
      order: null
    });
    await this.getCerts()
    this.certsAvailable = this.certsList.filter(item => this.employee.Certifications.map(obj => obj.id).indexOf(item.id) < 0);
  }

  onChangeSelection(selected) {
    this.certSelected = this.certsAvailable.find(item => item.id === selected);
  }
  onChangeSelectionOrder(selected) {
    this.certSelected.order = parseInt(selected);
  }
  onSubmit() {
    let data = this.certForm.value
    data.img = this.certSelected.img
    this.newCert.emit(data);
    this.modalReference.close('save')
  }
  async getCerts(): Promise<any> {
    const response = await this.certsService.getCerts().toPromise()
      .then(data => {
        this.certsList = data
        return
      }).catch(error => {
        return error
      })
    return response;
  }

}
