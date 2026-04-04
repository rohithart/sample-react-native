/**
 * Types Index - Re-exports all interfaces from centralized interfaces folder
 * This maintains backward compatibility with existing imports from @types
 */

// Re-export everything from interfaces
export * from '@interfaces';

// Additional type definitions for backward compatibility
export type { ApiResponse, PaginatedResponse } from '@interfaces';
