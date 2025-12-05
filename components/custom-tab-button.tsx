import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CustomTabButtonProps extends BottomTabBarButtonProps {
  label: string;
  isFocused: boolean;
}

export function CustomTabButton({ label, isFocused, onPress, ...props }: CustomTabButtonProps) {
  return (
    <Pressable
      {...props}
      onPress={onPress}
      style={styles.button}
    >
      <View style={styles.content}>
        {props.children}
        <Text style={[styles.label, isFocused && styles.labelFocused]}>
          {label}
        </Text>
      </View>
      {isFocused && <View style={styles.indicator} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FFF",
    marginTop: 4,
  },
  labelFocused: {
    fontWeight: "600",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    width: 30,
    height: 3,
    backgroundColor: "#FFF",
    borderRadius: 2,
  },
});

