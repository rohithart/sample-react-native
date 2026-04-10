import { Text } from "@/components/ui/text";
import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center p-6">
      <Stack.Screen options={{ title: "Modal" }} />
      <Text className="text-2xl font-bold text-typography-900 mb-4">
        This is a modal
      </Text>
      <Link href="/" dismissTo className="mt-6 py-4">
        <Text className="text-primary-500 underline">Go to home screen</Text>
      </Link>
    </View>
  );
}
