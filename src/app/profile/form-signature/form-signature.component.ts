import { Component, OnInit } from '@angular/core';
import { faCheck, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { Employee } from '../../models/employee.model';
import { CertsService } from '../../services/certs.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../services/employee.service';
import { Cert } from '../../models/cert.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-signature',
  templateUrl: './form-signature.component.html'
})
export class FormSignatureComponent implements OnInit {
  closeResult = '';

  certsList: any;
  faCheck = faCheck;
  faEdit = faEdit;
  faEye = faEye;
  certsSelected = new Array();
  employee = new Employee()
  selectedCert = new Cert();
  newCert = new Cert()
  modalReference: any
  employeeForm = new FormGroup({
    firstName: new FormControl(''),
    secondName: new FormControl(''),
    lastName: new FormControl(''),
    position: new FormControl(''),
    telephone: new FormControl(''),
    email: new FormControl(''),
    linkedin: new FormControl(''),
  });

  constructor(private certsService: CertsService, private modalService: NgbModal, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployee()
  }

  clickCert(cert: Cert) {
    this.selectedCert = cert
  }

  getEmployee() {
    this.employeeService.getEmployee("")
      .subscribe(employee => { 
        this.employee = <Employee>employee 
        this.employeeForm.patchValue(this.employee);
      });
  }
  openModalPreviewSignature(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
  onAddCert(data: Cert) {
    this.newCert = data
    console.log(Object.keys(this.newCert).length > 0)
  }

  openModalAddCertificates(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'save') {
        if (Object.keys(this.newCert).length > 0) {
          this.employee.certs.push(this.newCert)
          this.employee.certs = [...this.employee.certs]
        }
      }
    });
  }
  openModalModifyCertificates(content, cert: Cert) {
    this.selectedCert = cert
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'save') {
        let itemIndex = this.employee.certs.findIndex(item => item.id == this.selectedCert.id);
        this.employee.certs[itemIndex] = this.selectedCert;
        this.employee.certs = [...this.employee.certs]
      } else if (result === 'delete') {
        this.employee.certs = this.employee.certs.filter(item => item.id !== this.selectedCert.id);
        this.employee.certs = [...this.employee.certs]
      }
    });
  }

}
