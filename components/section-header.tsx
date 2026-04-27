import { useThemeColors } from '@/hooks/use-theme-colors';
import { Text} from 'react-native';

export const SectionHeader = ({ title }: { title: string }) => {
  const colors = useThemeColors();
  return (
    <Text style={{ fontSize: 13, fontWeight: '800', color: colors.sub, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, marginLeft: 4 }}>
      {title}
    </Text>
  )};