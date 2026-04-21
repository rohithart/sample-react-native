export const convertToLocalDateTimeString = (dateString: string | Date | undefined) => {
  return convertToString(dateString, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const convertToLocalDateString = (dateString: string | Date | undefined) => {
  return convertToString(dateString, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });   
};

export const convertToRelativeTime = (d: string) => {
  const date = new Date(d);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return convertToLocalDateString(date);
}

export const convertToTimeString = (d: string | Date | undefined | null) => {
  return convertToString(d, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const calculateDuration = (from: string | Date | undefined | null, to: string | Date | undefined | null) => {
  if (!from || !to) return '—';
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
}

const convertToString = (dateString: string | Date | undefined | null, format: Intl.DateTimeFormatOptions) => {
  if (!dateString) return '—';
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleString(undefined, format);
}