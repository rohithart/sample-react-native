import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/hooks/use-theme-colors';

export const SectionHeader = ({ title, style }: { title: string; style?: any }) => {
  const colors = useThemeColors();
  return (
    <Text style={{ fontSize: 13, fontWeight: '800', color: colors.sub, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4, ...style }}>
      {title}
    </Text>
  )};