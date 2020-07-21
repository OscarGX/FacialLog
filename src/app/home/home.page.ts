import { Component, ViewChild, OnInit } from '@angular/core';
import { CareersService } from '../services/careers.service';
import { Career } from '../models/career.model';
import { IonSegment } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  careers: Career[] = [];
  query = '';
  filterType = 'todos';
  @ViewChild(IonSegment, {static: true}) segment: IonSegment;
  constructor(private cs: CareersService, private router: Router) {
    this.cs.getPrograms().subscribe(data => {
      if (data !== null || data !== undefined) {
        this.careers = data;
      }
    });
  }

  ngOnInit() {
    this.segment.value = 'todos';
  }

  onSearchChange(event) {
    this.query = event.detail.value;
  }

  segmentChanged(event) {
    this.filterType = event.detail.value;
  }

  students(id: string) {
    this.router.navigateByUrl(`/groups/${id}`);
  }

}
