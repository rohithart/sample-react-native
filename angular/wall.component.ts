import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Crumb } from 'src/app/interfaces/Crumb';
import { UserRole, Wall } from 'src/app/interfaces';
import { WallService } from 'src/app/services/wall.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
  standalone: false
})
export class WallComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastrService);
  private readonly service = inject(WallService);
  readonly userService = inject(UserService);

  orgId = '';
  crumbs: Crumb[] = [];
  displayList: Wall[] = [];
  showLoading = true;
  posting = false;
  newPostText = '';
  newCommentText = '';
  user: UserRole;
  constructor() {
    this.orgId = this.route.snapshot.params['id'] || '';
    this.crumbs = [
      { name: 'home', link: `/view/${this.orgId}` },
      { name: 'Discussions', link: `/view/discussion/${this.orgId}` }
    ];
  }

  ngOnInit(): void {
    this.getData();
    this.getUserRole();
  }

  refresh() {
    this.getData();
    this.toast.success('Refreshed');
  }

  addPost() {
    if (!this.newPostText.trim()) return;

    this.posting = true;
    this.service.create(this.orgId, { message: this.newPostText }).subscribe(() => {
      this.getData();
      this.posting = false;
      this.newPostText = '';
    });
  }

  callIsLiked(id: string) {
    return () => this.isLiked(id);
  }

  callRefresh() {
    return () => this.getData();
  }

  isLiked(id: string) {
    const post = this.displayList.find((p) => p._id === id);

    if (post.likedByUsers.findIndex((u) => u === this.user?._id) > -1) {
      return true;
    }

    return false;
  }

  private getUserRole() {
    this.userService.getUserRole(this.orgId).subscribe((data) => {
      this.user = data;
    });
  }

  private getData() {
    this.showLoading = true;
    this.service.getAll(this.orgId).subscribe((data) => {
      this.displayList = data;
      this.showLoading = false;
    });
  }
}
