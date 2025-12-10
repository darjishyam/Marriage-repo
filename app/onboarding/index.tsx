import { useOnboarding } from "@/contexts/OnboardingContext";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ViewToken } from "react-native";

const { width, height } = Dimensions.get("window");

const DATA = [
  {
    id: '1',
    image: require("../../assets/images/screen1.jpg"),
    title: "Say goodbye to physical chandla book",
    description: "Hey there! Now you don't have to worry about losing your marriage chandla book.",
    backgroundColor: "#FADADD",
    archRadius: width * 0.65,
  },
  {
    id: '2',
    image: require("../../assets/images/screen2.jpg"),
    title: "Manage your guest list invitations",
    description: "Invite, track, and manage with ease your ultimate tool for seamless guest list and invitation management!",
    backgroundColor: "#FCE9B0",
    archRadius: width * 0.6,
  },
  {
    id: '3',
    image: require("../../assets/images/screen3.jpg"),
    title: "Secure & easy record management",
    description: "Keep your wedding records safe and accessible anytime with digital management tools.",
    backgroundColor: "#DFF1FF",
    archRadius: width * 0.6,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useOnboarding();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleComplete = async () => {
    await completeOnboarding();
    router.replace("/login");
  };

  const handleNext = () => {
    if (currentIndex < DATA.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleComplete();
    }
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const renderItem = ({ item }: { item: typeof DATA[0] }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>

        {/* Skip - Only show if not last slide? Or always? Original showed always or on 3 it went to login directly */}
        <TouchableOpacity style={styles.skipContainer} onPress={handleComplete}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.contentArea}>
          <View style={[styles.archWrapper, { borderTopLeftRadius: item.archRadius, borderTopRightRadius: item.archRadius }]}>
            <Image
              source={item.image}
              style={styles.archImage}
            />
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  // We need to render the bottom controls OUTSIDE the FlatList so they stay fixed
  // But the background color changes per slide. 
  // Strategy: The FlatList items take up full space, and we overlay the bottom controls.
  // OR: We set the background on the Slide, and controls are absolute at bottom.

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={DATA}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        scrollEventThrottle={32}
      />

      {/* Bottom Controls Overlay */}
      <View style={styles.bottomRow}>
        <View style={styles.indicatorContainer}>
          {DATA.map((_, index) => (
            <View
              key={index}
              style={[
                currentIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextArrow}>
            {currentIndex === DATA.length - 1 ? "✔" : "→"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: width,
    height: height, // Full screen height
    paddingHorizontal: 20,
    paddingTop: 60, // Adjust for status bar / skip button
    paddingBottom: 100, // Leave space for bottom row
  },
  skipContainer: {
    position: "absolute",
    right: 20,
    top: 40,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "600",
  },
  contentArea: {
    flex: 1,
  },
  archWrapper: {
    width: "100%",
    height: height * 0.55,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  archImage: {
    width: "140%",
    height: "140%",
    resizeMode: "cover",
    bottom: -60,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 25,
    lineHeight: 40,
    color: "#000",
  },
  description: {
    marginTop: 15,
    fontSize: 17,
    color: "#444",
    lineHeight: 26,
  },
  bottomRow: {
    position: "absolute",
    bottom: 30, // Fixed distance from bottom
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeDot: {
    width: 10,
    height: 10,
    backgroundColor: "#000",
    borderRadius: 5,
    marginRight: 6,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    backgroundColor: "#999",
    borderRadius: 4,
    marginRight: 6,
  },
  nextButton: {
    width: 55,
    height: 55,
    backgroundColor: "#000",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  nextArrow: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
  },
});
