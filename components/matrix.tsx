import { View } from "react-native";
import { HStack } from "./ui/hstack";
import { IconButton } from "./ui/icon-button";
import { ActionItem } from "@/types/actionItem";

interface MatrixProps {
  index: number;
  row: ActionItem[];
  onClose: () => void;
}

export function Matrix({ row, index, onClose }: MatrixProps) {

  return (
    <HStack
      key={index}
      style={{
        paddingHorizontal: 8,
        paddingVertical: 12,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      {row.map((action) => (
        <View
          key={action.id}
          style={{
            flex: 1,
            maxWidth: '25%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 4,
          }}
        >
          <View style={{ width: '100%', alignItems: 'center' }}>
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
        </View>
      ))}
    </HStack>
  );
}
