import { FormField } from '@/components/ui/form-field';
import { PageHeader } from '@/components/ui/page-header';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useBookingTypes } from '@/services/booking-type';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Wysiwyg from '@/components/wysiwyg';


export default function AddBookingScreen() {
  const { id: orgId } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bookingType, setBookingType] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [fromTime, setFromTime] = useState<Date | null>(null);
  const [toTime, setToTime] = useState<Date | null>(null);
  const [isFullDay, setIsFullDay] = useState(false);
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);
  const [showFromTime, setShowFromTime] = useState(false);
  const [showToTime, setShowToTime] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownItems, setDropdownItems] = useState<any[]>([]);
  const { data: bookingTypes, isLoading: loadingTypes } = useBookingTypes(orgId ?? '');

  React.useEffect(() => {
    if (bookingTypes) {
      setDropdownItems(bookingTypes.map((bt: any) => ({ label: bt.title, value: bt._id })));
    }
  }, [bookingTypes]);

  const handleSubmit = async () => {
    if (!title.trim() || !bookingType || !description.trim() || !fromDate || !toDate) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }
    if (!isFullDay && (!fromTime || !toTime)) {
      Alert.alert('Validation Error', 'Please select from and to time');
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    Alert.alert('Success', 'Booking created successfully', [
      { text: 'OK', onPress: () => router.push(`/view/bookings/${orgId}`) },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader icon="booking" title="Add New Booking" />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <FormField
          label="Title"
          required
          placeholder="Enter booking title"
          value={title}
          onChangeText={setTitle}
        />

        <View style={{ zIndex: 10 }}>
          <Text style={{ fontWeight: '600', color: colors.text, marginBottom: 6 }}>Booking Type *</Text>
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
        </View>

        <Text style={{ fontWeight: '600', color: colors.text, marginBottom: 6 }}>Description *</Text>
        <Wysiwyg
          value={description}
          onChange={setDescription}
          placeholder="Enter description..."
          style={{ minHeight: 120, borderWidth: 1, borderColor: colors.border, borderRadius: 8, backgroundColor: colors.bg, marginBottom: 8 }}
        />

        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '600', color: colors.text, marginBottom: 6 }}>From Date *</Text>
            <Pressable onPress={() => setShowFromDate(true)} style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, backgroundColor: colors.bg }}>
              <Text style={{ color: fromDate ? colors.text : colors.sub }}>{fromDate ? fromDate.toLocaleDateString() : 'Select date'}</Text>
            </Pressable>
            <DateTimePickerModal
              isVisible={showFromDate}
              mode="date"
              onConfirm={date => { setFromDate(date); setShowFromDate(false); }}
              onCancel={() => setShowFromDate(false)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '600', color: colors.text, marginBottom: 6 }}>To Date *</Text>
            <Pressable onPress={() => setShowToDate(true)} style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, backgroundColor: colors.bg }}>
              <Text style={{ color: toDate ? colors.text : colors.sub }}>{toDate ? toDate.toLocaleDateString() : 'Select date'}</Text>
            </Pressable>
            <DateTimePickerModal
              isVisible={showToDate}
              mode="date"
              onConfirm={date => { setToDate(date); setShowToDate(false); }}
              onCancel={() => setShowToDate(false)}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 8 }}>
          <Text style={{ fontWeight: '600', color: colors.text, marginRight: 12 }}>Full day booking</Text>
          <Switch value={isFullDay} onValueChange={setIsFullDay} />
        </View>

        {!isFullDay && (
          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: colors.text, marginBottom: 6 }}>From Time *</Text>
              <Pressable onPress={() => setShowFromTime(true)} style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, backgroundColor: colors.bg }}>
                <Text style={{ color: fromTime ? colors.text : colors.sub }}>{fromTime ? fromTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select time'}</Text>
              </Pressable>
              <DateTimePickerModal
                isVisible={showFromTime}
                mode="time"
                onConfirm={date => { setFromTime(date); setShowFromTime(false); }}
                onCancel={() => setShowFromTime(false)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: colors.text, marginBottom: 6 }}>To Time *</Text>
              <Pressable onPress={() => setShowToTime(true)} style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, backgroundColor: colors.bg }}>
                <Text style={{ color: toTime ? colors.text : colors.sub }}>{toTime ? toTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select time'}</Text>
              </Pressable>
              <DateTimePickerModal
                isVisible={showToTime}
                mode="time"
                onConfirm={date => { setToTime(date); setShowToTime(false); }}
                onCancel={() => setShowToTime(false)}
              />
            </View>
          </View>
        )}

        <Pressable
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
            opacity: pressed || isSubmitting ? 0.7 : 1,
            marginTop: 8,
          })}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff' }}>
            {isSubmitting ? 'Creating...' : 'Create Booking'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
