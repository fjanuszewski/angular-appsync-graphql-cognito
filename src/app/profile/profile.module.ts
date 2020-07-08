import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { AddCertificateComponent } from './add-certificate/add-certificate.component';
import { PreviewSignatureComponent } from './preview-signature/preview-signature.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCertificateComponent } from './form-certificate/form-certificate.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [
    ProfileComponent,
    AddCertificateComponent,
    PreviewSignatureComponent,
    FormCertificateComponent
  ],
  imports: [
    CommonModule,ProfileRoutingModule,
    FormsModule, 
    ReactiveFormsModule, SharedModule,FontAwesomeModule
  ],
  exports:[ProfileComponent]
})
export class ProfileModule { }
