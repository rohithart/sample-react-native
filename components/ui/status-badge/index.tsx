import React from 'react';
import { Text, View } from 'react-native';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { statusColors } from '@/constants/status';

interface StatusBadgeProps {
  status: string;
  color?: string;
}

export function StatusBadge({ status, color }: StatusBadgeProps) {
  const { primary, success, danger, inactive } = useThemeColors();
  let badgeColor;
  switch (status.toLowerCase()) {
    case 'draft':
      badgeColor = statusColors.draft;
      break;
    case 'pending':
      badgeColor = statusColors.pending;
      break;
    case 'progress':
    case 'in progress':
      badgeColor = statusColors.progress;
      break;
    case 'requested':
      badgeColor = statusColors.requested;
      break;
    case 'received':
      badgeColor = statusColors.received;
      break;
    case 'verified':
      badgeColor = statusColors.verified;
      break;
    case 'blocked':
      badgeColor = statusColors.blocked;
      break;
    case 'review':
      badgeColor = statusColors.review;
      break;
    case 'complete':
      badgeColor = statusColors.complete;
      break;
    case 'uploaded':
      badgeColor = statusColors.uploaded;
      break;
    case 'paid':
      badgeColor = statusColors.paid;
      break;
    case 'approved':
    case 'active':
      badgeColor = success;
      break;
    case 'rejected':
    case 'error':
      badgeColor = danger;
      break;
    case 'expired':
      badgeColor = statusColors.expired;
      break;
    case 'cancelled':
      badgeColor = statusColors.cancelled;
      break;
    case 'inactive':
    case 'archived':
      badgeColor = inactive;
      break;
    default:
      badgeColor = primary;
      break;
  }

  badgeColor = color ?? badgeColor;

  return (
    <View
      style={{
        backgroundColor: badgeColor + '20',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        style={{
          fontSize: 11,
          color: badgeColor,
          fontWeight: '600',
          textTransform: 'capitalize',
        }}
      >
        {status}
      </Text>
    </View>
  );
}
