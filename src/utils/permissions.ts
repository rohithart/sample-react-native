import { UserRole } from '@types/index';

/**
 * Check if user has permission to access a feature
 */
export function canAccess(role: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(role);
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    [UserRole.ADMIN]: 'Administrator',
    [UserRole.USER]: 'User',
    [UserRole.VIEWER]: 'Viewer',
  };
  return roleNames[role] || 'Unknown';
}

/**
 * Check if user is admin
 */
export function isAdmin(role: UserRole): boolean {
  return role === UserRole.ADMIN;
}

/**
 * Check if user has elevated privileges (Admin or User)
 */
export function hasElevatedPrivileges(role: UserRole): boolean {
  return [UserRole.ADMIN, UserRole.USER].includes(role);
}
