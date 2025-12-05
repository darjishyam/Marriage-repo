import { useWedding } from "@/contexts/WeddingContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function MyWeddingScreen() {
  const router = useRouter();
  const { hasWedding, weddingData } = useWedding();

  if (!hasWedding || !weddingData) {
    return (
      <View style={styles.emptyContainer}>
        {/* App Title */}
        <Text style={styles.title}>Shagun</Text>

        {/* Illustration */}
        <Image 
          source={require("../../assets/images/screen4.png")}
          style={styles.illustration}
        />

        {/* Heading */}
        <Text style={styles.heading}>No Wedding Created</Text>

        {/* Subtext */}
        <Text style={styles.subtext}>
          Let's Start Your Wedding Planing Now
        </Text>

        {/* Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push("/create-wedding")}
        >
          <Text style={styles.buttonText}>Create Wedding</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <WeddingDashboard weddingData={weddingData} />;
}

function WeddingDashboard({ weddingData }: { weddingData: { groomName: string; brideName: string; date: Date } }) {
  const router = useRouter();
  
  const formatDate = (date: Date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <View style={styles.dashboardContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shagun</Text>
      </View>

      {/* Event Selector */}
      <View style={styles.eventSelector}>
        <View style={styles.profileImagesContainer}>
          <Image 
            source={require("../../assets/images/bride.jpg")}
            style={[styles.profileImage, styles.brideImage]}
          />
          <Image 
            source={require("../../assets/images/groom.jpg")}
            style={[styles.profileImage, styles.groomImage]}
          />
        </View>
        <View style={styles.eventInfo}>
          <View style={styles.namesRow}>
            <Text style={styles.brideName}>{weddingData.brideName}</Text>
            <Ionicons name="heart" size={14} color="#000" style={styles.ringIcon} />
            <Text style={styles.groomName}>{weddingData.groomName}</Text>
          </View>
          <Text style={styles.eventDate}>{formatDate(weddingData.date)}</Text>
        </View>
        <TouchableOpacity style={styles.dropdownButton}>
          <Ionicons name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Cards Container */}
      <View style={styles.cardsContainer}>
        {/* Shagun Book Card */}
        <TouchableOpacity 
          style={[styles.card, styles.shagunBookCard]}
          onPress={() => router.push("/shagun-book")}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <Ionicons name="book-outline" size={18} color="#000" />
            <Text style={styles.cardTitle}>Shagun Book</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardStat}>
              <Ionicons name="person-outline" size={18} color="#000" />
              <Text style={styles.cardLabel}>People</Text>
              <Text style={styles.cardValue}>20</Text>
            </View>
            <View style={styles.cardStat}>
              <Ionicons name="cash-outline" size={18} color="#000" />
              <Text style={styles.cardLabel}>Total Chandlo</Text>
              <Text style={styles.cardValue}>₹ 2,000</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Expense Card */}
        <TouchableOpacity 
          style={[styles.card, styles.expenseCard]}
          onPress={() => router.push("/expenses")}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <Ionicons name="wallet-outline" size={18} color="#000" />
            <Text style={styles.cardTitle}>Expense</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardStat}>
              <Ionicons name="cash-outline" size={18} color="#000" />
              <Text style={styles.cardLabel}>Total Budget</Text>
              <Text style={styles.cardValue}>₹ 20,000</Text>
            </View>
            <View style={styles.cardStat}>
              <Ionicons name="refresh-outline" size={18} color="#000" />
              <Text style={styles.cardLabel}>Spent</Text>
              <Text style={styles.cardValue}>₹ 2,000</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Invitation Card */}
        <TouchableOpacity 
          style={[styles.card, styles.invitationCard]}
          onPress={() => router.push("/invitation-list")}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <Ionicons name="paper-plane-outline" size={18} color="#000" />
            <Text style={styles.cardTitle}>Invitation</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardStat}>
              <Ionicons name="send-outline" size={18} color="#000" />
              <Text style={styles.cardLabel}>Invitation Sent</Text>
              <Text style={styles.cardValue}>20</Text>
            </View>
            <View style={styles.cardStat}>
              <Ionicons name="people-outline" size={18} color="#000" />
              <Text style={styles.cardLabel}>Total Guest</Text>
              <Text style={styles.cardValue}>20</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 88 : 70,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#8A0030",
    alignSelf: "flex-start",
  },
  illustration: {
    width: 120,
    height: 120,
    marginTop: 40,
    marginBottom: 20,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },
  subtext: {
    color: "#777",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    paddingHorizontal: 45,
    borderRadius: 30,
    marginTop: 25,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  // Dashboard Styles
  dashboardContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  cardsContainer: {
    paddingTop: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#8A0030",
  },
  eventSelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  profileImagesContainer: {
    flexDirection: "row",
    marginRight: 12,
    position: "relative",
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  brideImage: {
    zIndex: 2,
  },
  groomImage: {
    marginLeft: -12,
    zIndex: 1,
  },
  eventInfo: {
    flex: 1,
  },
  namesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  brideName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  ringIcon: {
    marginHorizontal: 6,
  },
  groomName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  eventDate: {
    fontSize: 13,
    color: "#666",
  },
  dropdownButton: {
    padding: 4,
  },
  // Card Styles
  card: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    minHeight: 120,
  },
  shagunBookCard: {
    backgroundColor: "#FCE9B0",
  },
  expenseCard: {
    backgroundColor: "#FADADD",
  },
  invitationCard: {
    backgroundColor: "#DFF1FF",
    marginBottom: Platform.OS === "ios" ? 20 : 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginLeft: 8,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  cardStat: {
    flex: 1,
    alignItems: "flex-start",
  },
  cardLabel: {
    fontSize: 11,
    color: "#666",
    marginTop: 6,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
});
