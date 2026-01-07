import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { Dimensions, PanResponder, Platform, StyleSheet, Text, View } from "react-native";

interface RangeSliderProps {
  min: number;
  max: number;
  lowValue: number;
  highValue: number;
  onValueChange: (low: number, high: number) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SLIDER_WIDTH = SCREEN_WIDTH - 80; // Account for padding
const HANDLE_SIZE = 24;

export function RangeSlider({ min, max, lowValue, highValue, onValueChange }: RangeSliderProps) {
  const { t } = useLanguage();
  const [low, setLow] = useState(lowValue);
  const [high, setHigh] = useState(highValue);
  const activeHandleRef = useRef<"low" | "high" | null>(null);

  useEffect(() => {
    setLow(lowValue);
    setHigh(highValue);
  }, [lowValue, highValue]);

  const getPositionFromValue = (value: number) => {
    return ((value - min) / (max - min)) * SLIDER_WIDTH;
  };

  const getValueFromPosition = (position: number) => {
    const value = min + (position / SLIDER_WIDTH) * (max - min);
    return Math.max(min, Math.min(max, Math.round(value)));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const x = evt.nativeEvent.locationX;
        const lowPos = getPositionFromValue(low);
        const highPos = getPositionFromValue(high);
        const lowDist = Math.abs(x - lowPos);
        const highDist = Math.abs(x - highPos);

        if (lowDist < highDist) {
          activeHandleRef.current = "low";
        } else {
          activeHandleRef.current = "high";
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        const newX = gestureState.moveX - 40; // Account for padding
        const newValue = getValueFromPosition(newX);

        if (activeHandleRef.current === "low") {
          const newLow = Math.min(newValue, high - 1);
          setLow(newLow);
          onValueChange(newLow, high);
        } else if (activeHandleRef.current === "high") {
          const newHigh = Math.max(newValue, low + 1);
          setHigh(newHigh);
          onValueChange(low, newHigh);
        }
      },
      onPanResponderRelease: () => {
        activeHandleRef.current = null;
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <Text style={styles.label}>{t("high")}</Text>
        <Text style={styles.label}>{t("low")}</Text>
      </View>
      <View style={styles.sliderContainer} {...panResponder.panHandlers}>
        <View style={styles.track}>
          <View
            style={[
              styles.activeTrack,
              {
                left: getPositionFromValue(low),
                width: getPositionFromValue(high) - getPositionFromValue(low),
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.handle,
            styles.lowHandle,
            { left: getPositionFromValue(low) - HANDLE_SIZE / 2 },
          ]}
        />
        <View
          style={[
            styles.handle,
            styles.highHandle,
            { left: getPositionFromValue(high) - HANDLE_SIZE / 2 },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  sliderContainer: {
    height: 40,
    justifyContent: "center",
    position: "relative",
  },
  track: {
    height: 4,
    backgroundColor: "#E6E6E6",
    borderRadius: 2,
    position: "relative",
  },
  activeTrack: {
    height: 4,
    backgroundColor: "#000",
    borderRadius: 2,
    position: "absolute",
  },
  handle: {
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    borderRadius: HANDLE_SIZE / 2,
    backgroundColor: "#000",
    position: "absolute",
    top: (40 - HANDLE_SIZE) / 2,
    borderWidth: 3,
    borderColor: "#FFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      },
    }),
  },
  lowHandle: {},
  highHandle: {},
});

