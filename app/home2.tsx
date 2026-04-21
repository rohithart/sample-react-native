import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { FormField } from '@/components/ui/form-field';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { HStack } from '@/components/ui/hstack';
import { IconButton } from '@/components/ui/icon-button';
import { ListItemCard } from '@/components/ui/list-item-card';
import { MetadataCard } from '@/components/ui/metadata-card';
import { PageHeader } from '@/components/ui/page-header';
import { Pressable } from '@/components/ui/pressable';
import { SectionHeading } from '@/components/ui/section-heading';
import { StatusBadge } from '@/components/ui/status-badge';
import { Text } from '@/components/ui/text';
import { Toast } from '@/components/ui/toast';
import { VStack } from '@/components/ui/vstack';
import React from 'react';
import { ScrollView } from 'react-native';

export default function Home2() {
	return (
		<GluestackUIProvider>
			<ScrollView contentContainerStyle={{ padding: 24 }}>
				<VStack space={'sm'}>
					<Box><Text>Box Component</Text></Box>
					<Button>Button Component</Button>
					<Center><Text>Center Component</Text></Center>
					<FormField label="FormField Component" value="" onChangeText={() => {}} />
					<HStack space={'sm'}><Text>HStack</Text><Button>Btn</Button></HStack>
					<IconButton icon={null} aria-label="IconButton" text={''} onPress={function (): void {
            throw new Error('Function not implemented.');
          }}/>
					<ListItemCard title="ListItemCard" description="Description" onPress={function (): void {
            throw new Error('Function not implemented.');
          }}/>
					<MetadataCard title="MetadataCard" value="Value" />
					<PageHeader title="PageHeader Component" />
					<Pressable><Text>Pressable Component</Text></Pressable>
					<SectionHeading title={'AAA'}>SectionHeading Component</SectionHeading>
					<StatusBadge status="success">StatusBadge</StatusBadge>
					<Text>Text Component</Text>
					<Toast visible={false} message="Toast Component" />
					<VStack space={'sm'}><Text>VStack</Text><Button>Btn</Button></VStack>
				</VStack>
			</ScrollView>
		</GluestackUIProvider>
	);
}
