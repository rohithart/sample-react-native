import { VStack } from '@/components/ui/vstack';
import React from 'react';
import { SectionHeader } from '../section-header';

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
}

export function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <VStack space="sm">
      <SectionHeader title={title} style={{ fontSize: 10, fontWeight: '700' }} />
      {children}
    </VStack>
  );
}
