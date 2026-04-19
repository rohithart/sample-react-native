import { View } from "react-native";
import { HStack } from "./ui/hstack";
import { IconButton } from "./ui/icon-button";
import { ActionItem } from "@/types/actionItem";

interface MatrixProps {
  index: number;
  row: ActionItem[];
  onClose: () => void;
}

export function Matrix({row, index, onClose}: MatrixProps) {
  return (
    <HStack
      key={index}
      className="justify-around items-center"
      style={{
        paddingHorizontal: 4,
        paddingBottom: 8,
      }}
    >
      {row.map((action) => (
        <View
          key={action.id}
          style={{
            flex: 1,
            maxWidth: '33.33%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton
            icon={action.icon}
            text={action.label}
            onPress={() => {
              action.onPress();
              onClose();
            }}
            color={action.color}
            disabled={action.disabled}
          />
        </View>
      ))}
    </HStack>
  )
}