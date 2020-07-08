import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-preview-signature',
  templateUrl: './preview-signature.component.html'
})
export class PreviewSignatureComponent implements OnInit {

@Input() employee:Employee
@Input() modalReference:any
  constructor() { }

  ngOnInit(): void {
  }

}
