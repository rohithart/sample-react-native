import { Component, inject, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntityType } from '@propordo/models/dist/enum';
import { ToastrService } from 'ngx-toastr';

import { UserRole, Wall } from 'src/app/interfaces';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { WallService } from 'src/app/services/wall.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-wall-card',
  templateUrl: './wall-card.component.html',
  styleUrl: './wall-card.component.scss',
  standalone: false
})
export class WallCardComponent {
  private readonly modal = inject(NgbModal);
  private readonly toast = inject(ToastrService);
  private readonly service = inject(WallService);
  readonly userService = inject(UserService);
  private readonly commentService = inject(CommentService);
  private readonly emailService = inject(EmailService);

  @Input() wall: Wall;
  @Input() user: UserRole;
  @Input() orgId: string;
  @Input() fromPreview = false;
  @Input() refresh!: () => Promise<void>;
  @Input() isLiked!: (id: string) => Promise<void>;

  posting = false;
  newCommentText = '';

  like(id: string) {
    this.service.like(id, this.orgId).subscribe(() => {
      this.refresh();
    });
  }

  unlike(id: string) {
    this.service.unlike(id, this.orgId).subscribe(() => {
      this.refresh();
    });
  }

  async report(id) {
    const modalRef = this.modal.open(ConfirmDialogComponent, {
      centered: true,
      backdrop: 'static'
    });

    modalRef.componentInstance.message = 'Are you sure you want to report this discussion?';
    modalRef.componentInstance.isWarning = false;
    try {
      const result = await modalRef.result;
      if (result === true) {
        this.emailService.sendReportWall(id, { organisation: this.wall.organisation }).subscribe(() => {
          this.toast.success('Discussion has been reported');
        });
      }
    } catch {
      console.log('dismissed');
    }
  }

  async delete(id) {
    const modalRef = this.modal.open(ConfirmDialogComponent, {
      centered: true,
      backdrop: 'static'
    });

    modalRef.componentInstance.message = 'Are you sure you want to delete this post?';
    modalRef.componentInstance.isWarning = true;
    try {
      const result = await modalRef.result;
      if (result === true) {
        this.service.delete(id).subscribe(() => {
          this.toast.success('Post has been deleted');
          this.refresh();
        });
      }
    } catch {
      console.log('dismissed');
    }
  }

  addComment(post: Wall) {
    if (!this.newCommentText?.trim()) return;

    const data = {
      comment: this.newCommentText.trim(),
      entityId: post._id,
      entityType: EntityType.WALL,
      organisation: this.orgId
    };

    this.commentService.createWallComment(this.orgId, data).subscribe(() => {
      this.newCommentText = '';
      this.refresh();
    });
  }

  callDelete(id: string) {
    return () => this.deleteComment(id);
  }

  private async deleteComment(id: string) {
    const modalRef = this.modal.open(ConfirmDialogComponent, {
      centered: true,
      backdrop: 'static'
    });

    modalRef.componentInstance.message = 'Are you sure you want to delete this comment?';
    modalRef.componentInstance.isWarning = true;
    try {
      const result = await modalRef.result;
      if (result === true) {
        this.commentService.delete(id).subscribe(() => {
          this.toast.success('Comment has been deleted');
          this.refresh();
        });
      }
    } catch {
      console.log('dismissed');
    }
  }
}
