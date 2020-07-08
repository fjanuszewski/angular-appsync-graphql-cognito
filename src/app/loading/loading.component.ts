import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private loadingService:LoadingService) { }

  ngOnInit(): void {
  }
  state() {
    return this.loadingService.getState()
  }  

}
