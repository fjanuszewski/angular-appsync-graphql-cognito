import { Component, OnInit } from '@angular/core';
import { faCheck, faEdit, faEye,faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import { Employee } from '../../models/employee.model';
import { NgbModal,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Cert } from '../../models/cert.model';
import { FormGroup, FormControl } from '@angular/forms';
import { APIService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  closeResult = '';

  certsList: any;
  faCheck = faCheck;
  faEdit = faEdit;
  faEye = faEye;
  faPlusSquare =faPlusSquare;
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
    Certifications: new FormControl([]),
  });

  constructor(
    private loadingService: LoadingService,
    private modalService: NgbModal,
    private apiService: APIService,
    private activatedRoute: ActivatedRoute,
    modalConfig:NgbModalConfig
  ) {
    // modalConfig.backdrop = "static"
  }
  async ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.employee = <Employee>data.EmployeeResolverService
      if (!Array.isArray(this.employee.Certifications)) { this.employee.Certifications = []}
      this.employeeForm.patchValue(this.employee);
      this.loadingService.setState(false)
    });
  }

  async onSubmit() {
    this.employee = this.employeeForm.value
    console.log("EMPLOYEE:",JSON.stringify(this.employee))
    const data = await this.apiService.UpdateEmployee(this.employee);
    console.log("RESULT:",data)
  }

  clickCert(cert: Cert) {
    this.selectedCert = cert
  }

  async GetEmployee() {
    this.loadingService.setState(true)
    this.employee = await this.apiService.GetEmployee("fabianj@droptek.com")
    this.employeeForm.patchValue(this.employee);
    this.loadingService.setState(false)

  }

  openModalPreviewSignature(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
    }, (reason) => {});
  }
  onAddCert(data: Cert) {
    console.log("add cert",data)
    this.newCert = data
  }

  openModalAddCertificates(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      if (result === 'save') {
        if (Object.keys(this.newCert).length > 0) {
          this.employee.Certifications.push(this.newCert)
          this.employee.Certifications = [...this.employee.Certifications]
          this.employeeForm.patchValue({
            Certifications:this.employee.Certifications
          });
        }
      }
    }, (reason) => {});
  }
  openModalModifyCertificates(content, cert: Cert) {
    this.selectedCert = cert
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      if (result === 'save') {
        let itemIndex = this.employee.Certifications.findIndex(item => item.id == this.selectedCert.id);
        this.employee.Certifications[itemIndex] = this.selectedCert;
        this.employee.Certifications = [...this.employee.Certifications]
      } else if (result === 'delete') {
        this.employee.Certifications = this.employee.Certifications.filter(item => item.id !== this.selectedCert.id);
        this.employee.Certifications = [...this.employee.Certifications]
        this.employeeForm.patchValue({
          Certifications:this.employee.Certifications
        });
      }
    }, (reason) => {});
  }

}
