export interface ActionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
}