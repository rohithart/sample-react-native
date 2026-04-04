// ============================================
// SERVICES INDEX - ALL 57 SERVICES EXPORTED
// ============================================

// Core Services
export { userService } from './user.service';
export { organisationService } from './organisation.service';
export { authApiService as authService } from './auth.service';
export { dashboardService } from './dashboard.service';

// Entity Services - Comprehensive CRUD operations
export { taskService } from './task.service';
export { vendorService } from './vendor.service';
export { invoiceService } from './invoice.service';
export { quoteService } from './quote.service';
export { workorderService } from './workorder.service';
export { documentService } from './document.service';
export { transactionService } from './transaction.service';
export { messageService } from './message.service';

// Operational Services
export { conversationService } from './conversation.service';
export { commentService } from './comment.service';
export { workflowService } from './workflow.service';
export { groupService } from './group.service';
export { bookingService } from './booking.service';
export { meetingService } from './meeting.service';
export { eventService } from './event.service';
export { folderService } from './folder.service';

// Financial Services
export { financialYearService } from './financialYear.service';
export { budgetService } from './budget.service';
export { categoryService } from './category.service';
export { chartOfAccountService } from './chartOfAccount.service';
export { statusService } from './status.service';
export { transactionEntryService } from './transactionEntry.service';

// Communication Services
export { announcementService } from './announcement.service';
export { newsletterService } from './newsletter.service';
export { emailService } from './email.service';
export { wallService } from './wall.service';
export { voteService } from './vote.service';

// Asset Services
export { assetService } from './asset.service';
export { assetTypeService } from './assetType.service';
export { attachmentService } from './attachment.service';
export { evidenceService } from './evidence.service';
export { imageService } from './image.service';

// Utility Services
export { searchService } from './search.service';
export { historyService } from './history.service';
export { chartService } from './chart.service';
export { alertService } from './alert.service';
export { tourService } from './tour.service';
export { analyticsService } from './analytics.service';
export { tokenService } from './token.service';
export { pdfService } from './pdf.service';
export { reminderService } from './reminder.service';
export { timelineService } from './timeline.service';
export { aiService } from './ai.service';
export { demoService } from './demo.service';
export { informationService } from './information.service';
export { contentService } from './content.service';
export { firebaseService } from './firebase.service';

// Vendor Services
export { vendorCommentService } from './vendorComment.service';
export { vendorSubmitService } from './vendorSubmit.service';

// Type Services
export { bookingTypeService } from './bookingType.service';
export { eventTypeService } from './eventType.service';

// Context Services
export { userContextService } from './userContext.service';
export { organisationContextService } from './organisationContext.service';
export { settingsUIService } from './settingsUI.service';
export { settingsContextService } from './settingsContext.service';

// Admin Services
export { adminOrganisationService } from './admin-organisation.service';

// Real-time Services
export { chatApiService as chatService } from './chat.service';
export { notificationApiService as notificationService } from './notification.service';

// ============================================
// TYPE EXPORTS (from @interfaces)
// ============================================

// Re-export all types and interfaces from centralized interfaces folder
export * from '@interfaces';
