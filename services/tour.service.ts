import { inject, Injectable } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import { StepOptions } from 'shepherd.js';

@Injectable({ providedIn: 'root' })
export class TourService {
  private readonly shepherd = inject(ShepherdService);

  resetTour(key: string) {
    localStorage.removeItem(key);
  }

  startAdminTour() {
    if (this.checkTour('admin-tour')) {
      this.initTour();
      const steps = this.getAdminTourSteps();
      this.shepherd.addSteps(steps);
      this.shepherd.start();
      this.markTour('admin-tour', true);
    }
  }

  startUserTour() {
    if (this.checkTour('user-tour')) {
      this.initTour();
      const steps = this.getUserTourSteps();
      this.shepherd.addSteps(steps);
      this.shepherd.start();
      this.markTour('user-tour', true);
    }
  }

  startWorkflowTour() {
    if (this.checkTour('workflow-tour')) {
      this.initTour();
      const steps = this.getWorkflowTourSteps();
      this.shepherd.addSteps(steps);
      this.shepherd.start();
      this.markTour('workflow-tour', true);
    }
  }

  private initTour() {
    this.shepherd.defaultStepOptions = {
      scrollTo: true,
      scrollToHandler: function (el) {
        const offset = 100;
        window.scrollTo({
          top: el?.getBoundingClientRect().top + window.pageYOffset - offset,
          behavior: 'smooth'
        });
      },
      cancelIcon: { enabled: true },
      canClickTarget: false,
      classes: 'shepherd-theme-custom'
    };

    this.shepherd.modal = true;
  }

  private navButtons() {
    return [
      { text: 'Back', classes: 'btn btn-light', action: () => this.shepherd.back() },
      { text: 'Next', classes: 'btn btn-primary', action: () => this.shepherd.next() }
    ];
  }

  private lastNavButtons() {
    return [
      { text: 'Back', classes: 'btn btn-light', action: () => this.shepherd.back() },
      { text: 'Finish', classes: 'btn btn-primary', action: () => this.shepherd.complete() }
    ];
  }

  private firstNavButtons() {
    return [
      { text: 'Skip', classes: 'btn btn-light', action: () => this.shepherd.cancel() },
      { text: 'Start', classes: 'btn btn-primary', action: () => this.shepherd.next() }
    ];
  }

  private checkTour(key: string) {
    if (!localStorage.getItem(key)) {
      return true;
    }
    return false;
  }

  private markTour(key: string, value) {
    localStorage.setItem(key, value);
  }

  private getAdminTourSteps(): StepOptions[] {
    return [
      {
        id: 'welcome',
        title: 'Welcome 👋',
        text: `
        <strong>You’re in Admin mode.</strong><br/>
        This quick tour will show you where to manage people, modules, and settings.
      `,
        buttons: this.firstNavButtons()
      },
      {
        id: 'switch',
        title: 'Switch to User View',
        attachTo: {
          element: '#tour-switch-to-user',
          on: 'left'
        },
        text: `
        Use this to <strong>switch back to User view</strong> and see exactly what regular users see.
        Great for validating permissions and experiences.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'profile',
        title: 'Your Profile',
        attachTo: {
          element: '#tour-user-profile',
          on: 'left'
        },
        text: `
        Access your <strong>personal profile</strong> here.
        Update your details and manage your account preferences.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'settings',
        title: 'View & Preferences',
        attachTo: {
          element: '#tour-settings',
          on: 'left'
        },
        text: `
        Control how you <strong>view and interact</strong> with the platform.
        These settings affect your personal experience only.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'notifications',
        title: 'Notifications',
        attachTo: {
          element: '#tour-notifications',
          on: 'left'
        },
        text: `
        Stay up to date with <strong>important activity</strong> across this organisation —
        approvals, updates, and system alerts.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'workflow',
        title: 'Workflows',
        attachTo: {
          element: '#workflow-module',
          on: 'right'
        },
        text: `
        Create, track, and manage <strong>all workflows</strong> in one place.
        This is where most day-to-day work happens.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'modules',
        title: 'Modules',
        attachTo: {
          element: '#tour-modules',
          on: 'right'
        },
        text: `
        Navigate to <strong>all platform modules</strong> for your organisation.
        Here are all the modules that you have access to.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'tour',
        title: 'Quick tour',
        attachTo: {
          element: '#tour',
          on: 'left'
        },
        text: `
       You can start this tour anytime by clicking the <i class="fas fa-compass"></i> icon wherever it’s available.
      `,
        buttons: this.lastNavButtons()
      }
    ];
  }

  private getUserTourSteps(): StepOptions[] {
    return [
      {
        id: 'welcome',
        title: 'Welcome 👋',
        text: `
        <strong>You’re in your dashboard.</strong><br/>
        This quick tour will show you where to manage requests, bookings, modules, and settings.
      `,
        buttons: this.firstNavButtons()
      },
      {
        id: 'profile',
        title: 'Your Profile',
        attachTo: {
          element: '#tour-user-profile',
          on: 'left'
        },
        text: `
        Access your <strong>personal profile</strong> here.
        Update your details and manage your account preferences.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'settings',
        title: 'View & Preferences',
        attachTo: {
          element: '#tour-settings',
          on: 'left'
        },
        text: `
        Control how you <strong>view and interact</strong> with the platform.
        These settings affect your personal experience only.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'notifications',
        title: 'Notifications',
        attachTo: {
          element: '#tour-notifications',
          on: 'left'
        },
        text: `
        Stay up to date with <strong>important activity</strong> across this organisation —
        approvals, updates, and system alerts.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'wall',
        title: 'Your discussion wall',
        attachTo: {
          element: '#wall',
          on: 'right'
        },
        text: `
    This is the <strong>community discussion board</strong> for your organisation.<br/>
    Think of it like a Facebook-style feed where everyone can post updates, ask questions,
    and join conversations.
  `,
        buttons: this.navButtons()
      },
      {
        id: 'groups',
        title: 'Your groups',
        attachTo: {
          element: '#your-groups',
          on: 'right'
        },
        text: `
    Groups are for <strong>focused conversations</strong>.<br/>
    Chat and collaborate with people in groups you’re part of —
    perfect for teams, committees, or projects.
  `,
        buttons: this.navButtons()
      },
      {
        id: 'bookings',
        title: 'Your bookings',
        attachTo: {
          element: '#booking',
          on: 'right'
        },
        text: `
    Manage <strong>scheduled bookings</strong> here.<br/>
    View upcoming bookings, track their status, and stay organised.
  `,
        buttons: this.navButtons()
      },
      {
        id: 'requests',
        title: 'Your requests',
        attachTo: {
          element: '#requests',
          on: 'right'
        },
        text: `
    Requests are <strong>action items</strong> that need attention.<br/>
    Submit, track, and respond to requests — all in one place.
  `,
        buttons: this.navButtons()
      },

      {
        id: 'modules',
        title: 'Modules',
        attachTo: {
          element: '#tour-modules',
          on: 'right'
        },
        text: `
        Navigate to <strong>all platform modules</strong> for your organisation.
        Here are all the modules that you have access to.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'tour',
        title: 'Quick tour',
        attachTo: {
          element: '#tour',
          on: 'left'
        },
        text: `
       You can start this tour anytime by clicking the <i class="fas fa-compass"></i> icon wherever it’s available.
      `,
        buttons: this.lastNavButtons()
      }
    ];
  }

  private getWorkflowTourSteps(): StepOptions[] {
    return [
      {
        id: 'welcome',
        title: 'Welcome to this workflow 👋',
        text: `
        <strong>This is the workflow details page.</strong><br/>
        Everything related to this job lives here — updates, files, tasks, costs, and communication.
        Let’s take a quick tour so you know where to find what.
      `,
        buttons: this.firstNavButtons()
      },
      {
        id: 'download',
        attachTo: {
          element: '#tour-download',
          on: 'bottom'
        },
        title: 'Download workflow',
        text: `
        Download a <strong>PDF snapshot</strong> of this workflow.
        Useful for sharing, printing, or offline review.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'attachments',
        attachTo: {
          element: '#tour-attachments',
          on: 'bottom'
        },
        title: 'Documents',
        text: `
        Upload and manage <strong>documents related to this workflow</strong>,
        such as evidences, warranties or any other supporting files.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'images',
        attachTo: {
          element: '#tour-images',
          on: 'bottom'
        },
        title: 'Images',
        text: `
        Add and view <strong>photos and images</strong> linked to this workflow.
        Great for evidence, progress updates, or visual context.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'history',
        attachTo: {
          element: '#tour-history',
          on: 'bottom'
        },
        title: 'Workflow history',
        text: `
        See a <strong>complete history of changes</strong> made to this workflow —
        including updates, actions, and key events over time.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'user',
        attachTo: {
          element: '#tour-user',
          on: 'left'
        },
        title: 'Assigned user',
        text: `
        This shows the <strong>user responsible</strong> for this workflow.
        They are the primary point of contact and owner.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'group',
        attachTo: {
          element: '#tour-group',
          on: 'left'
        },
        title: 'Visible groups',
        text: `
        These groups can <strong>view and collaborate</strong> on this workflow.
        Access is controlled based on group membership.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'catch',
        attachTo: {
          element: '#tour-catch',
          on: 'left'
        },
        title: 'Catch me up',
        text: `
        New here? Click <strong>Catch me up</strong> to get a quick summary
        of what’s happening — tasks, costs, activity, and current status.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'preview',
        attachTo: {
          element: '#tour-preview',
          on: 'left'
        },
        title: 'Workflow preview',
        text: `
        A <strong>high-level overview</strong> of this workflow,
        including key milestones and timeline activity.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'actions',
        attachTo: {
          element: '#tour-actions',
          on: 'left'
        },
        title: 'Workflow actions',
        text: `
        Manage this workflow by <strong>editing, archiving, or deleting</strong> it.
        Use these actions carefully, especially once work has started.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'ai',
        attachTo: {
          element: '#tour-ai',
          on: 'left'
        },
        title: 'Generate AI response',
        text: `
        Use AI to <strong>generate summaries, replies, or insights</strong>
        based on the current workflow context.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'ai-res',
        attachTo: {
          element: '#tour-ai-response',
          on: 'left'
        },
        title: 'AI responses',
        text: `
        View all <strong>AI-generated responses</strong> created for this workflow.
        You can reference or reuse them anytime.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'timeline',
        attachTo: {
          element: '#tour-timeline',
          on: 'left'
        },
        title: 'Timeline',
        text: `
        The timeline shows a <strong>chronological view</strong> of everything
        that’s happened in this workflow — from creation to now.
      `,
        buttons: this.navButtons()
      },
      {
        id: 'tabs',
        attachTo: {
          element: '#tour-tabs',
          on: 'top'
        },
        title: 'Related tabs',
        text: `
        These tabs contain <strong>everything connected to this workflow</strong> —
        tasks, quotes, work orders, invoices, files, votes, and more.
      `,
        buttons: this.lastNavButtons()
      }
    ];
  }
}
