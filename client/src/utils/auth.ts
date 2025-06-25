// Set auth token in localStorage and axios defaults
export const setAuthToken = (token: string) => {
  const tokenName = process.env.NEXT_PUBLIC_TOKEN_NAME || 'bandmate_token';
  localStorage.setItem(tokenName, token);
};

// Remove auth token from localStorage and axios defaults
export const removeAuthToken = () => {
  const tokenName = process.env.NEXT_PUBLIC_TOKEN_NAME || 'bandmate_token';
  localStorage.removeItem(tokenName);
};

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null; // For SSR
  
  const tokenName = process.env.NEXT_PUBLIC_TOKEN_NAME || 'bandmate_token';
  return localStorage.getItem(tokenName);
};

// Format date for display
export const formatDate = (dateString: string, includeTime = false): string => {
  if (!dateString) return '';
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Calculate duration between two dates in hours and minutes
export const calculateDuration = (startTime: string, endTime: string): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  const diffMs = end.getTime() - start.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHrs === 0) {
    return `${diffMins} minutes`;
  } else if (diffMins === 0) {
    return `${diffHrs} hour${diffHrs !== 1 ? 's' : ''}`;
  } else {
    return `${diffHrs} hour${diffHrs !== 1 ? 's' : ''} ${diffMins} minute${diffMins !== 1 ? 's' : ''}`;
  }
};
