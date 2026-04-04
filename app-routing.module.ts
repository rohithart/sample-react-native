import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { PropOrdoRouteConfig } from './app-config';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserComponent } from './pages/user/user.component';
import { GroupComponent } from './pages/group/group.component';
import { WorkflowComponent } from './pages/workflow/workflow.component';
import { TaskComponent } from './pages/task/task.component';
import { QuoteComponent } from './pages/quote/quote.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { EvidenceComponent } from './pages/evidence/evidence.component';
import { LayoutAdminComponent } from './theme/layout-admin/layout-admin.component';
import { LayoutUserComponent } from './theme/layout-user/layout-user.component';
import { OrganisationComponent } from './pages/organisation/organisation.component';
import { LayoutOrgComponent } from './theme/layout-org/layout-org.component';
import { AddOrganisationComponent } from './pages/organisation/add-organisation/add-organisation.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/dashboard/user-dashboard/user-dashboard.component';
import { AddWorkflowComponent } from './pages/workflow/add-workflow/add-workflow.component';
import { AddTaskComponent } from './pages/task/add-task/add-task.component';
import { AddQuoteComponent } from './pages/quote/add-quote/add-quote.component';
import { AddInvoiceComponent } from './pages/invoice/add-invoice/add-invoice.component';
import { AddEvidenceComponent } from './pages/evidence/add-evidence/add-evidence.component';
import { AddGroupComponent } from './pages/group/add-group/add-group.component';
import { WorkflowDetailsComponent } from './pages/workflow/workflow-details/workflow-details.component';
import { EditWorkflowComponent } from './pages/workflow/edit-workflow/edit-workflow.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { VendorComponent } from './pages/vendor/vendor.component';
import { AddVendorComponent } from './pages/vendor/add-vendor/add-vendor.component';
import { VendorDetailsComponent } from './pages/vendor/vendor-details/vendor-details.component';
import { UserDetailsComponent } from './pages/user/user-details/user-details.component';
import { EditVendorComponent } from './pages/vendor/edit-vendor/edit-vendor.component';
import { EditUserComponent } from './pages/user/edit-user/edit-user.component';
import { TaskDetailsComponent } from './pages/task/task-details/task-details.component';
import { CategoryComponent } from './pages/category/category.component';
import { AddCategoryComponent } from './pages/category/add-category/add-category.component';
import { CategoryDetailsComponent } from './pages/category/category-details/category-details.component';
import { BookingTypeComponent } from './pages/bookingType/bookingType.component';
import { AddBookingTypeComponent } from './pages/bookingType/add-bookingType/add-bookingType.component';
import { BookingTypeDetailsComponent } from './pages/bookingType/bookingType-details/bookingType-details.component';
import { GroupDetailsComponent } from './pages/group/group-details/group-details.component';
import { UserRequestComponent } from './pages/user-request/user-request.component';
import { AddUserRequestComponent } from './pages/user-request/add-userRequest/add-userRequest.component';
import { UserRequestDetailsComponent } from './pages/user-request/userRequest-details/userRequest-details.component';
import { BookingComponent } from './pages/booking/booking.component';
import { BookingDetailsComponent } from './pages/booking/booking-details/booking-details.component';
import { AddBookingComponent } from './pages/booking/add-booking/add-booking.component';
import { AnnouncementComponent } from './pages/announcement/announcement.component';
import { AddAnnouncementComponent } from './pages/announcement/add-announcement/add-announcement.component';
import { AnnouncementDetailsComponent } from './pages/announcement/announcement-details/announcement-details.component';
import { UserAnnouncementComponent } from './pages/announcement/user-announcement/user-announcement.component';
import { UserAnnouncementDetailsComponent } from './pages/announcement/user-announcement-details/user-announcement-details.component';
import { UserBookingComponent } from './pages/booking/user-booking/user-booking.component';
import { UserBookingDetailsComponent } from './pages/booking/user-booking-details/user-booking-details.component';
import { MyRequestComponent } from './pages/user-request/my-request/my-request.component';
import { MyRequestDetailsComponent } from './pages/user-request/myRequest-details/myRequest-details.component';
import { AddMeetingComponent } from './pages/meeting/add-meeting/add-meeting.component';
import { MeetingDetailsComponent } from './pages/meeting/meeting-details/meeting-details.component';
import { MeetingComponent } from './pages/meeting/meeting.component';
import { UserMeetingDetailsComponent } from './pages/meeting/user-meeting-details/user-meeting-details.component';
import { UserMeetingComponent } from './pages/meeting/user-meeting/user-meeting.component';
import { EditMeetingComponent } from './pages/meeting/edit-meeting/edit-meeting.component';
import { VoteComponent } from './pages/vote/vote.component';
import { AddVoteComponent } from './pages/vote/add-vote/add-vote.component';
import { VoteDetailsComponent } from './pages/vote/vote-details/vote-details.component';
import { UserVoteDetailsComponent } from './pages/vote/user-vote-details/user-vote-details.component';
import { UserVoteComponent } from './pages/vote/user-vote/user-vote.component';
import { UserInformationComponent } from './pages/information/user-information/user-information.component';
import { UserInformationDetailsComponent } from './pages/information/user-information-details/user-information-details.component';
import { InformationComponent } from './pages/information/information.component';
import { AddInformationComponent } from './pages/information/add-information/add-information.component';
import { InformationDetailsComponent } from './pages/information/information-details/information-details.component';
import { EditInformationComponent } from './pages/information/edit-information/edit-information.component';
import { HelpComponent } from './pages/help/help.component';
import { UserHelpComponent } from './pages/help/user-help/user-help.component';
import { OrgContextGuard } from './interceptors/org-context.guard';
import { QuoteDetailsComponent } from './pages/quote/quote-details/quote-details.component';
import { EvidenceDetailsComponent } from './pages/evidence/evidence-details/evidence-details.component';
import { InvoiceDetailsComponent } from './pages/invoice/invoice-details/invoice-details.component';
import { SubmitQuoteComponent } from './pages/submit/quote/submit-quote.component';
import { SubmitInvoiceComponent } from './pages/submit/invoice/submit-invoice.component';
import { EditTaskComponent } from './pages/task/edit-task/edit-task.component';
import { EditEvidenceComponent } from './pages/evidence/edit-evidence/edit-evidence.component';
import { EditQuoteComponent } from './pages/quote/edit-quote/edit-quote.component';
import { EditInvoiceComponent } from './pages/invoice/edit-invoice/edit-invoice.component';
import { EditCategoryComponent } from './pages/category/edit-category/edit-category.component';
import { EditBookingTypeComponent } from './pages/bookingType/edit-bookingType/edit-bookingType.component';
import { AssetTypeComponent } from './pages/assetType/assetType.component';
import { AddAssetTypeComponent } from './pages/assetType/add-assetType/add-assetType.component';
import { AssetTypeDetailsComponent } from './pages/assetType/assetType-details/assetType-details.component';
import { EditAssetTypeComponent } from './pages/assetType/edit-assetType/edit-assetType.component';
import { DocumentComponent } from './pages/document/document.component';
import { AddDocumentComponent } from './pages/document/add-document/add-document.component';
import { DocumentDetailsComponent } from './pages/document/document-details/document-details.component';
import { EditDocumentComponent } from './pages/document/edit-document/edit-document.component';
import { AssetComponent } from './pages/asset/asset.component';
import { AddAssetComponent } from './pages/asset/add-asset/add-asset.component';
import { AssetDetailsComponent } from './pages/asset/asset-details/asset-details.component';
import { EditAssetComponent } from './pages/asset/edit-asset/edit-asset.component';
import { WallComponent } from './pages/wall/wall.component';
import { UserAdminComponent } from './pages/user/user-admin/user-admin.component';
import { UserGroupComponent } from './pages/group/user-group/user-group.component';
import { DemoComponent } from './pages/demo/demo.component';
import { ChatComponent } from './pages/chat/chat.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { ImagesComponent } from './pages/images/images.component';
import { FilesComponent } from './pages/files/files.component';
import { ReminderComponent } from './pages/reminder/reminder.component';
import { AddReminderComponent } from './pages/reminder/add-reminder/add-reminder.component';
import { ReminderDetailsComponent } from './pages/reminder/reminder-details/reminder-details.component';
import { EditReminderComponent } from './pages/reminder/edit-reminder/edit-reminder.component';
import { WorkflowPreviewComponent } from './pages/workflow/workflow-preview/workflow-preview.component';
import { EditOrganisationComponent } from './pages/organisation/edit-organisation/edit-organisation.component';
import { SubmitEvidenceComponent } from './pages/submit/evidence/submit-evidence.component';
import { StatusComponent } from './pages/status/status.component';
import { AddEventComponent } from './pages/event/add-event/add-event.component';
import { EventDetailsComponent } from './pages/event/event-details/event-details.component';
import { EventComponent } from './pages/event/event.component';
import { AddEventTypeComponent } from './pages/eventType/add-eventType/add-eventType.component';
import { EditEventTypeComponent } from './pages/eventType/edit-eventType/edit-eventType.component';
import { EventTypeDetailsComponent } from './pages/eventType/eventType-details/eventType-details.component';
import { EventTypeComponent } from './pages/eventType/eventType.component';
import { UserEventComponent } from './pages/event/user-event/user-event.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { AddContentComponent } from './pages/content/add-content/add-content.component';
import { ContentComponent } from './pages/content/content.component';
import { ContentDetailsComponent } from './pages/content/content-details/content-details.component';
import { EditContentComponent } from './pages/content/edit-content/edit-content.component';
import { AddFolderComponent } from './pages/folder/add-folder/add-folder.component';
import { FolderComponent } from './pages/folder/folder.component';
import { AddWorkorderComponent } from './pages/workorder/add-workorder/add-workorder.component';
import { EditWorkorderComponent } from './pages/workorder/edit-workorder/edit-workorder.component';
import { WorkorderDetailsComponent } from './pages/workorder/workorder-details/workorder-details.component';
import { WorkorderComponent } from './pages/workorder/workorder.component';
import { SubmitWorkorderComponent } from './pages/submit/workorder/submit-workorder.component';
import { AdminOrganisationComponent } from './pages/admin-organisation/admin-organisation.component';
import { OrganisationDetailsComponent } from './pages/admin-organisation/organisation-details/organisation-details.component';
import { AdminEditOrganisationComponent } from './pages/admin-organisation/edit-organisation/edit-organisation.component';
import { FinancialYearComponent } from './pages/financialYear/financialYear.component';
import { AddFinancialYearComponent } from './pages/financialYear/add-financialYear/add-financialYear.component';
import { FinancialYearDetailsComponent } from './pages/financialYear/financialYear-details/financialYear-details.component';
import { ChartOfAccountsComponent } from './pages/chartOfAccounts/chartOfAccounts.component';
import { AddChartOfAccountsComponent } from './pages/chartOfAccounts/add-chartOfAccounts/add-chartOfAccounts.component';
import { ChartOfAccountsDetailsComponent } from './pages/chartOfAccounts/chartOfAccounts-details/chartOfAccounts-details.component';
import { EditChartOfAccountsComponent } from './pages/chartOfAccounts/edit-chartOfAccounts/edit-chartOfAccounts.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { AddBudgetComponent } from './pages/budget/add-budget/add-budget.component';
import { BudgetDetailsComponent } from './pages/budget/budget-details/budget-details.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { AddTransactionComponent } from './pages/transaction/add-transaction/add-transaction.component';
import { TransactionDetailsComponent } from './pages/transaction/transaction-details/transaction-details.component';
import { EntriesComponent } from './pages/entries/entries.component';
import { IncomeExpenseComponent } from './pages/analytics/financial/incomeExpense/incomeExpense.component';
import { BalanceSheetComponent } from './pages/analytics/financial/balanceSheet/balanceSheet.component';
import { UnsavedItemsGuard } from './guards/unsaved-items.guard';
import { EditTransactionComponent } from './pages/transaction/edit-transaction/edit-transaction.component';
import { MeComponent } from './pages/me/me.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutOrgComponent,
    children: [
      { path: PropOrdoRouteConfig.routes.home, component: OrganisationComponent, canActivate: [AuthGuard] },
      { path: PropOrdoRouteConfig.routes.adminOrganisations, component: AdminOrganisationComponent, canActivate: [AuthGuard] },
      { path: `${PropOrdoRouteConfig.routes.adminOrganisation}/:id`, component: OrganisationDetailsComponent, canActivate: [AuthGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.adminOrganisation}/:id/edit`,
        component: AdminEditOrganisationComponent,
        canActivate: [AuthGuard]
      },
      { path: PropOrdoRouteConfig.routes.organisations, component: OrganisationComponent, canActivate: [AuthGuard] },
      { path: `${PropOrdoRouteConfig.routes.contents}`, component: ContentComponent, canActivate: [AuthGuard] },
      { path: `${PropOrdoRouteConfig.routes.content}/new`, component: AddContentComponent, canActivate: [AuthGuard] },
      { path: `${PropOrdoRouteConfig.routes.content}/:id`, component: ContentDetailsComponent, canActivate: [AuthGuard] },
      { path: `${PropOrdoRouteConfig.routes.content}/:id/edit`, component: EditContentComponent, canActivate: [AuthGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.organisation}/new`,
        component: AddOrganisationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.vendorSubmit}/quote/:orgId/:id`,
        component: SubmitQuoteComponent,
        data: { forPreview: false }
      },
      {
        path: `${PropOrdoRouteConfig.routes.vendorSubmit}/invoice/:orgId/:id`,
        component: SubmitInvoiceComponent,
        data: { forPreview: false }
      },
      {
        path: `${PropOrdoRouteConfig.routes.vendorSubmit}/workorder/:orgId/:id`,
        component: SubmitWorkorderComponent,
        data: { forPreview: false }
      },
      {
        path: `${PropOrdoRouteConfig.routes.vendorSubmit}/evidence/:orgId/:id`,
        component: SubmitEvidenceComponent,
        data: { forPreview: false }
      },
      { path: PropOrdoRouteConfig.routes.profile, component: ProfileComponent, canActivate: [AuthGuard] },
      { path: PropOrdoRouteConfig.routes.devices, component: DevicesComponent, canActivate: [AuthGuard] },
      { path: PropOrdoRouteConfig.routes.demo, component: DemoComponent },
      { path: PropOrdoRouteConfig.routes.demoStart, component: OrganisationComponent },
      { path: PropOrdoRouteConfig.routes.error404, component: NotFoundComponent }
    ]
  },
  {
    path: 'view',
    component: LayoutUserComponent,
    children: [
      { path: `${PropOrdoRouteConfig.routes.wall}/:id`, component: WallComponent, canActivate: [AuthGuard] },
      { path: PropOrdoRouteConfig.routes.help, component: UserHelpComponent, canActivate: [AuthGuard] },
      { path: ':id', component: UserDashboardComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.groups}/:id`, component: UserGroupComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.admins}/:id`, component: UserAdminComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.chat}/:orgId/:id`, component: ChatComponent, canActivate: [AuthGuard, OrgContextGuard] },

      {
        path: `${PropOrdoRouteConfig.routes.announcements}/:id`,
        component: UserAnnouncementComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.announcement}/:orgId/:id`,
        component: UserAnnouncementDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.informations}/:id`,
        component: UserInformationComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.information}/:orgId/:id`,
        component: UserInformationDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.meetings}/:id`, component: UserMeetingComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.meeting}/:orgId/:id`,
        component: UserMeetingDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.votes}/:id`, component: UserVoteComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.vote}/:orgId/:id`,
        component: UserVoteDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.events}/:id`, component: UserEventComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.bookings}/:id`, component: UserBookingComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.booking}/new/:id`,
        component: AddBookingComponent,
        canActivate: [AuthGuard, OrgContextGuard],
        data: { isForUser: true }
      },
      {
        path: `${PropOrdoRouteConfig.routes.booking}/:orgId/:id`,
        component: UserBookingDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.userRequests}/:id`, component: MyRequestComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.userRequest}/new/:id`,
        component: AddUserRequestComponent,
        canActivate: [AuthGuard, OrgContextGuard],
        data: { isForUser: true }
      },
      {
        path: `${PropOrdoRouteConfig.routes.userRequest}/:orgId/:id`,
        component: MyRequestDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: '**', component: OrganisationComponent, canActivate: [AuthGuard, OrgContextGuard] }
    ]
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    children: [
      { path: `${PropOrdoRouteConfig.routes.wall}/:id`, component: WallComponent, canActivate: [AuthGuard] },
      { path: `${PropOrdoRouteConfig.routes.me}/:orgId`, component: MeComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: PropOrdoRouteConfig.routes.help, component: HelpComponent, canActivate: [AuthGuard] },
      { path: `${PropOrdoRouteConfig.routes.analytics}/:id`, component: AnalyticsComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.analytics}/income-expense/:id`,
        component: IncomeExpenseComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.analytics}/balance-sheet/:id`,
        component: BalanceSheetComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.status}/:type/:id`, component: StatusComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: ':id', component: AdminDashboardComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: ':id/edit', component: EditOrganisationComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.images}/:id`, component: ImagesComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.attachments}/:id`, component: FilesComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.users}/:id`, component: UserComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.user}/new/:id`, component: AddUserComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.user}/:orgId/:id`, component: UserDetailsComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.user}/:orgId/:id/edit`,
        component: EditUserComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.groups}/:id`, component: GroupComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.group}/new/:id`, component: AddGroupComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.group}/:orgId/:id`,
        component: GroupDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.workflows}/:id`, component: WorkflowComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.workflow}/new/:id`,
        component: AddWorkflowComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.workflow}/new/:id/category/:cId`,
        component: AddWorkflowComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.workflow}/:orgId/:id`,
        component: WorkflowDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.workflow}/preview/:orgId/:id`,
        component: WorkflowPreviewComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.workflow}/:orgId/:id/edit`,
        component: EditWorkflowComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.tasks}/:id`, component: TaskComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.task}/new/:id`, component: AddTaskComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.task}/new/:id/workflow/:wId`,
        component: AddTaskComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.task}/:orgId/:id`, component: TaskDetailsComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.task}/:orgId/:id/edit`,
        component: EditTaskComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.quotes}/:id`, component: QuoteComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.quote}/new/:id`, component: AddQuoteComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.quote}/:orgId/:id`,
        component: QuoteDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.quote}/:orgId/:id/edit`,
        component: EditQuoteComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.quote}/preview/:orgId/:id`,
        component: SubmitQuoteComponent,
        data: { forPreview: true },
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.quote}/new/:id/workflow/:wId`,
        component: AddQuoteComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.invoices}/:id`, component: InvoiceComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.invoice}/new/:id`, component: AddInvoiceComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.invoice}/new/:id/workflow/:wId`,
        component: AddInvoiceComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.invoice}/new/:id/quote/:qId`,
        component: AddInvoiceComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.invoice}/new/:id/workorder/:woId`,
        component: AddInvoiceComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.invoice}/:orgId/:id`,
        component: InvoiceDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.invoice}/:orgId/:id/edit`,
        component: EditInvoiceComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.invoice}/preview/:orgId/:id`,
        component: SubmitInvoiceComponent,
        data: { forPreview: true },
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.workorders}/:id`, component: WorkorderComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.workorder}/new/:id`,
        component: AddWorkorderComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.workorder}/new/:id/workflow/:wId`,
        component: AddWorkorderComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.workorder}/new/:id/quote/:qId`,
        component: AddWorkorderComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.workorder}/:orgId/:id`,
        component: WorkorderDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.workorder}/:orgId/:id/edit`,
        component: EditWorkorderComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.workorder}/preview/:orgId/:id`,
        component: SubmitWorkorderComponent,
        data: { forPreview: true },
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.evidences}/:id`, component: EvidenceComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.evidence}/new/:id`,
        component: AddEvidenceComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.evidence}/new/:id/workflow/:wId`,
        component: AddEvidenceComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.evidence}/:orgId/:id/edit`,
        component: EditEvidenceComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.evidence}/preview/:orgId/:id`,
        component: SubmitEvidenceComponent,
        data: { forPreview: true },
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.evidence}/:orgId/:id`,
        component: EvidenceDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.vendors}/:id`, component: VendorComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.vendor}/new/:id`, component: AddVendorComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.vendor}/:orgId/:id`,
        component: VendorDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.vendor}/:orgId/:id/edit`,
        component: EditVendorComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.categories}/:id`, component: CategoryComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.category}/new/:id`,
        component: AddCategoryComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.category}/:orgId/:id`,
        component: CategoryDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.category}/:orgId/:id/edit`,
        component: EditCategoryComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.budgets}/:id`, component: BudgetComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.budget}/new/:id`,
        component: AddBudgetComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.budget}/:orgId/:id`,
        component: BudgetDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.coas}/:id`, component: ChartOfAccountsComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.coa}/new/:id`,
        component: AddChartOfAccountsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.coa}/:orgId/:id`,
        component: ChartOfAccountsDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.coa}/:orgId/:id/edit`,
        component: EditChartOfAccountsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.fys}/:id`, component: FinancialYearComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.fy}/new/:id`,
        component: AddFinancialYearComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.fy}/:orgId/:id`,
        component: FinancialYearDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.ledgers}/:id`,
        component: TransactionComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.ledger}/new/:id`,
        component: AddTransactionComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.ledger}/new/:id/invoice/:oId`,
        component: AddTransactionComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.ledger}/:orgId/:id`,
        component: TransactionDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard],
        canDeactivate: [UnsavedItemsGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.ledger}/:orgId/:id/edit`,
        component: EditTransactionComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.transactions}/:id`,
        component: EntriesComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.bookingTypes}/:id`,
        component: BookingTypeComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.bookingType}/new/:id`,
        component: AddBookingTypeComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.bookingType}/:orgId/:id`,
        component: BookingTypeDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.bookingType}/:orgId/:id/edit`,
        component: EditBookingTypeComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.userRequests}/:id`,
        component: UserRequestComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.userRequest}/new/:id`,
        component: AddUserRequestComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.userRequest}/:orgId/:id`,
        component: UserRequestDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.eventTypes}/:id`,
        component: EventTypeComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.eventType}/new/:id`,
        component: AddEventTypeComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.eventType}/:orgId/:id`,
        component: EventTypeDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.eventType}/:orgId/:id/edit`,
        component: EditEventTypeComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.events}/:id`, component: EventComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.event}/new/:id`, component: AddEventComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.event}/new/:id/type/:tId`,
        component: AddEventComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.event}/:orgId/:id`,
        component: EventDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.bookings}/:id`, component: BookingComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.booking}/new/:id`, component: AddBookingComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.booking}/:orgId/:id`,
        component: BookingDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.reminders}/:id`, component: ReminderComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.reminder}/new/:id`,
        component: AddReminderComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.reminder}/:orgId/:id`,
        component: ReminderDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.reminder}/:orgId/:id/edit`,
        component: EditReminderComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.announcements}/:id`,
        component: AnnouncementComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.announcement}/new/:id`,
        component: AddAnnouncementComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.announcement}/:orgId/:id`,
        component: AnnouncementDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.meetings}/:id`, component: MeetingComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.meeting}/new/:id`, component: AddMeetingComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.meeting}/:orgId/:id`,
        component: MeetingDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.meeting}/:orgId/:id/edit`,
        component: EditMeetingComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.votes}/:id`, component: VoteComponent, canActivate: [AuthGuard, OrgContextGuard] },
      { path: `${PropOrdoRouteConfig.routes.vote}/new/:id`, component: AddVoteComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.vote}/new/:id/workflow/:wId`,
        component: AddVoteComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.vote}/new/:id/quote/:qId`,
        component: AddVoteComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.vote}/new/:id/invoice/:iId`,
        component: AddVoteComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: `${PropOrdoRouteConfig.routes.vote}/:orgId/:id`, component: VoteDetailsComponent, canActivate: [AuthGuard, OrgContextGuard] },
      {
        path: `${PropOrdoRouteConfig.routes.informations}/:id`,
        component: InformationComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.information}/new/:id`,
        component: AddInformationComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.information}/:orgId/:id`,
        component: InformationDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.information}/:orgId/:id/edit`,
        component: EditInformationComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.assetTypes}/:id`,
        component: AssetTypeComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.assetType}/new/:id`,
        component: AddAssetTypeComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.assetType}/:orgId/:id`,
        component: AssetTypeDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.assetType}/:orgId/:id/edit`,
        component: EditAssetTypeComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.assets}/:id`,
        component: AssetComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.asset}/new/:id/type/:tId`,
        component: AddAssetComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.asset}/new/:id`,
        component: AddAssetComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.asset}/:orgId/:id`,
        component: AssetDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.asset}/:orgId/:id/edit`,
        component: EditAssetComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.documents}/:id`,
        component: DocumentComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.document}/new/:id`,
        component: AddDocumentComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.document}/new/:id/:fId`,
        component: AddDocumentComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.document}/:orgId/:id`,
        component: DocumentDetailsComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.document}/:orgId/:id/edit`,
        component: EditDocumentComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.folder}/new/:id`,
        component: AddFolderComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.folder}/new/:id/:fId`,
        component: AddFolderComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      {
        path: `${PropOrdoRouteConfig.routes.folder}/:orgId/:id`,
        component: FolderComponent,
        canActivate: [AuthGuard, OrgContextGuard]
      },
      { path: '**', component: OrganisationComponent, canActivate: [AuthGuard, OrgContextGuard] }
    ]
  },
  { path: '**', redirectTo: PropOrdoRouteConfig.routes.error404 }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
