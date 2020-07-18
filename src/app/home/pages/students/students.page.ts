import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../../services/students.service';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
  id: string;
  students: Student[] = [];
  filterBy = 'name';
  qry = '';
  constructor(private route: ActivatedRoute, private ss: StudentsService, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ss.getStudents(this.id).subscribe(data => {
      if (data !== null || data !== undefined) {
        this.students = data;
      }
    });
  }

  ngOnInit() {
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
