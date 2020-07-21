import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupsService } from '../../../services/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/models/group.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit, OnDestroy {
  group: string;
  groupCollRef: Subscription;
  groups: Group[] = [];
  qry = '';
  isEmpty = false;
  constructor(private gs: GroupsService, private route: ActivatedRoute, private router: Router) {
    this.group = this.route.snapshot.paramMap.get('group');
    this.groupCollRef = this.gs.getGroups(this.group).subscribe(data => {
      this.isEmpty = data.length > 0;
      this.groups = data;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.groupCollRef.unsubscribe();
  }

  onSearchChange(event) {
    this.qry = event.detail.value;
  }

  students(group: string) {
    this.router.navigateByUrl(`/students/${group}`);
  }

}
