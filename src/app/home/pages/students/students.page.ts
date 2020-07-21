import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../../services/students.service';
import { Student } from '../../../models/student.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit, OnDestroy {
  group: string;
  students: Student[] = [];
  filterBy = 'name';
  qry = '';
  isEmpty = false;
  studentsCollRef: Subscription;
  constructor(private route: ActivatedRoute, private ss: StudentsService, private router: Router) {
    this.group = this.route.snapshot.paramMap.get('id');
    this.studentsCollRef = this.ss.getStudents(this.group).subscribe(data => {
      if (data !== null || data !== undefined) {
        this.students = data;
        this.isEmpty = data.length > 0;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.studentsCollRef.unsubscribe();
  }

  change(event) {
    this.filterBy = event.detail.value;
  }

  onSearchChange(event) {
    this.qry = event.detail.value;
  }

  studentDetails(id: string) {
    this.router.navigateByUrl(`/student/${id}`);
  }

}
