import { FormField } from '@/components/ui/form-field';
import { HStack } from '@/components/ui/hstack';
import { PageHeader } from '@/components/ui/page-header';
import { VStack } from '@/components/ui/vstack';
import { Wysiwyg } from '@/components/wysiwyg';
import { ENTITY_ICONS } from '@/constants/entity-icons';
import { useToast } from '@/context/toast-context';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useCreateBooking } from '@/services/booking';
import { useBookingTypes } from '@/services/booking-type';
import { convertToLocalDateTimeString } from '@/utils/date';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Switch } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';

export default function AddBookingScreen() {
  const { id: orgId } = useLocalSearchParams<{ id: string }>();
  const colors = useThemeColors();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bookingType, setBookingType] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [fromTime, setFromTime] = useState<Date | undefined>(undefined);
  const [toTime, setToTime] = useState<Date | undefined>(undefined);
  const [isFullDay, setIsFullDay] = useState(false);
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);
  const [showFromTime, setShowFromTime] = useState(false);
  const [showToTime, setShowToTime] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownItems, setDropdownItems] = useState<any[]>([]);
  const createBooking = useCreateBooking(orgId ?? '');
  const { showToast } = useToast();

  const I = ENTITY_ICONS;
  const isFormValid =
    !!title.trim() &&
    !!bookingType &&
    !!description.trim() &&
    !!fromDate &&
    !!toDate &&
    (isFullDay || (!!fromTime && !!toTime));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minFromDate = today;
  const minToDate = fromDate ? fromDate : today;
  const { data: bookingTypes, isLoading: loadingTypes } = useBookingTypes(orgId ?? '');

  React.useEffect(() => {
    if (bookingTypes) {
      setDropdownItems(bookingTypes.map((bt: any) => ({ label: bt.title, value: bt._id })));
    }
  }, [bookingTypes]);

  const handleSubmit = async () => {
    if (!title.trim() || !bookingType || !description.trim() || !fromDate || !toDate) {
      showToast({ type: 'error', title: 'Validation Error', message: 'Please fill all required fields' });
      return;
    }
    if (!isFullDay && (!fromTime || !toTime)) {
      showToast({ type: 'error', title: 'Validation Error', message: 'Please select from and to time' });
      return;
    }
    setIsSubmitting(true);
    try {
      await createBooking.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        bookingType: bookingType as unknown as any,
        bookingDateFrom: fromDate,
        bookingDateTo: toDate,
        bookingTimeFrom: isFullDay ? undefined : fromTime,
        bookingTimeTo: isFullDay ? undefined : toTime,
        isFullDay,
        organisation: orgId as unknown as any,
      });
      setIsSubmitting(false);
      showToast({ type: 'success', title: 'Success', message: 'Booking created successfully' });
    } catch (e: any) {
      setIsSubmitting(false);
      showToast({ type: 'error', title: 'Error', message: e?.message || 'Failed to create booking' });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader
        icon="booking"
        title="Add New Booking"
        rightAction={
          <Pressable onPress={handleSubmit} style={{ padding: 8 }} disabled={!isFormValid || isSubmitting}>
            <I.save size={20} color={colors.primary} />
          </Pressable>
        }
      />

      <ScrollView
        contentContainerStyle={{ padding: 20, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack space="md" className="flex-1">
          <FormField
            label="Title"
            required
            placeholder="Enter booking title"
            value={title}
            onChangeText={setTitle}
          />

          <VStack space="md" className="flex-1" style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: '600', color: colors.text }}>Booking Type *</Text>
            <DropDownPicker
              open={dropdownOpen}
              value={bookingType}
              items={dropdownItems}
              setOpen={setDropdownOpen}
              setValue={setBookingType}
              setItems={setDropdownItems}
              placeholder={loadingTypes ? 'Loading...' : 'Select booking type'}
              style={{ borderColor: colors.border, marginBottom: 8 }}
              dropDownContainerStyle={{ borderColor: colors.border }}
              listMode="SCROLLVIEW"
              disabled={loadingTypes}
            />
          </VStack>

          <VStack space="md" className="flex-1">
            <Text style={{ fontWeight: '600', color: colors.text }}>Description *</Text>
            <Wysiwyg
              value={description}
              onChange={setDescription}
              placeholder="Enter description..."
            />
          </VStack>

          <HStack style={{ alignItems: 'center' }}>
            <VStack  space="md" className="flex-1">
              <Text style={{ fontWeight: '600', color: colors.text }}>From Date *</Text>
              <Text
                onPress={() => setShowFromDate(true)}
                style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, backgroundColor: colors.bg, color: fromDate ? colors.text : colors.sub }}
              >
                {fromDate ? convertToLocalDateTimeString(fromDate) : 'Select date'}
              </Text>
              <DateTimePickerModal
                isVisible={showFromDate}
                mode="date"
                minimumDate={minFromDate}
                onConfirm={(date: any) => { setFromDate(date); setShowFromDate(false); if (toDate && date > toDate) setToDate(null); }}
                onCancel={() => setShowFromDate(false)}
              />
            </VStack>
            <VStack  space="md" className="flex-1">
              <Text style={{ fontWeight: '600', color: colors.text }}>To Date *</Text>
              <Text
                onPress={() => setShowToDate(true)}
                style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, backgroundColor: colors.bg, color: toDate ? colors.text : colors.sub }}
              >
                {toDate ? convertToLocalDateTimeString(toDate) : 'Select date'}
              </Text>
              <DateTimePickerModal
                isVisible={showToDate}
                mode="date"
                minimumDate={minToDate}
                onConfirm={(date: any) => { setToDate(date); setShowToDate(false); }}
                onCancel={() => setShowToDate(false)}
              />
            </VStack>
          </HStack>

          <HStack style={{ alignItems: 'center', marginTop: 8, marginBottom: 8 }}>
            <Text style={{ fontWeight: '600', color: colors.text }}>Full day booking</Text>
            <Switch value={isFullDay} onValueChange={setIsFullDay} />
          </HStack>

          {!isFullDay && (
            <HStack style={{ alignItems: 'center' }}>
              <VStack space="md" className="flex-1">
                <Text style={{ fontWeight: '600', color: colors.text }}>From Time *</Text>
                <Text
                  onPress={() => setShowFromTime(true)}
                  style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, backgroundColor: colors.bg, color: fromTime ? colors.text : colors.sub }}
                >
                  {fromTime ? fromTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select time'}
                </Text>
                <DateTimePickerModal
                  isVisible={showFromTime}
                  mode="time"
                  onConfirm={(date: any) => { setFromTime(date); setShowFromTime(false); }}
                  onCancel={() => setShowFromTime(false)}
                />
              </VStack>
              <VStack space="md" className="flex-1">
                <Text style={{ fontWeight: '600', color: colors.text }}>To Time *</Text>
                <Text
                  onPress={() => setShowToTime(true)}
                  style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, backgroundColor: colors.bg, color: toTime ? colors.text : colors.sub }}
                >
                  {toTime ? toTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select time'}
                </Text>
                <DateTimePickerModal
                  isVisible={showToTime}
                  mode="time"
                  onConfirm={(date: any) => { setToTime(date); setShowToTime(false); }}
                  onCancel={() => setShowToTime(false)}
                />
              </VStack>
            </HStack>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
