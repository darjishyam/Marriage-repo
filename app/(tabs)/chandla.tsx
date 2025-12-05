import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useMemo } from "react";
import { Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useShagun } from "@/contexts/ShagunContext";
import { RangeSlider } from "@/components/RangeSlider";

export default function MyChandlaScreen() {
  const router = useRouter();
  const { shagunEntries } = useShagun();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortName, setSortName] = useState("");
  const [shagunLow, setShagunLow] = useState(0);
  const [shagunHigh, setShagunHigh] = useState(10000);

  const formatDate = (dateString: string) => {
    // Format: "14-02-2025" -> "14-02-2025" (already formatted)
    return dateString;
  };

  const extractAmount = (amountString: string): number => {
    // Extract numeric value from "₹ 2000" format
    const numericValue = amountString.replace(/[₹,\s]/g, "");
    return parseInt(numericValue) || 0;
  };

  const filteredEntries = useMemo(() => {
    let filtered = shagunEntries.filter((entry) => {
      const matchesSearch =
        entry.brideName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.groomName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesName = !sortName || 
        entry.brideName.toLowerCase().includes(sortName.toLowerCase()) ||
        entry.groomName.toLowerCase().includes(sortName.toLowerCase());
      
      const amount = extractAmount(entry.amount);
      const matchesAmount = amount >= shagunLow && amount <= shagunHigh;

      return matchesSearch && matchesName && matchesAmount;
    });

    return filtered;
  }, [shagunEntries, searchQuery, sortName, shagunLow, shagunHigh]);

  const handleReset = () => {
    setSortName("");
    setShagunLow(0);
    setShagunHigh(10000);
  };

  const handleNext = () => {
    setShowSortModal(false);
  };

  // Empty state
  if (shagunEntries.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Shagun</Text>
        </View>

        {/* Empty State Content */}
        <View style={styles.emptyContent}>
          {/* Book Icon with Decorative Elements */}
          <View style={styles.iconContainer}>
            {/* Decorative dots */}
            <View style={[styles.decorativeDot, { top: 30, left: 50 }]} />
            <View style={[styles.decorativeDot, { top: 70, right: 60 }]} />
            <View style={[styles.decorativeDot, { bottom: 50, left: 40 }]} />
            <View style={[styles.decorativeDot, { bottom: 70, right: 50 }]} />
            <View style={[styles.decorativeDot, { top: 50, left: 20 }]} />
            <View style={[styles.decorativeDot, { top: 90, right: 30 }]} />
            
            {/* Decorative circles */}
            <View style={[styles.decorativeCircle, { top: 40, right: 40 }]} />
            <View style={[styles.decorativeCircle, { bottom: 60, left: 60 }]} />
            <View style={[styles.decorativeCircle, { top: 20, right: 20 }]} />
            
            {/* Book icon */}
            <Ionicons name="book-outline" size={140} color="#E0E0E0" />
          </View>

          {/* Primary Text */}
          <Text style={styles.primaryText}>No Chandla Added</Text>

          {/* Secondary Text */}
          <Text style={styles.secondaryText}>Add your chabdla</Text>

          {/* Add Shagun Button */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push("/add-shagun")}
          >
            <Text style={styles.addButtonText}>Add Shagun</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // List view
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Shagun</Text>
      </View>

      {/* Search and Sort Bar */}
      <View style={styles.searchSortContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.sortButton}
          onPress={() => setShowSortModal(true)}
        >
          <Ionicons name="swap-vertical-outline" size={18} color="#000" />
          <Text style={styles.sortButtonText}>Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Entry Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{filteredEntries.length} Shagun</Text>
      </View>

      {/* Shagun Entries List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredEntries.map((entry) => (
          <View key={entry.id} style={styles.shagunCard}>
            {/* Top Section */}
            <View style={styles.cardTopSection}>
              <View style={styles.cardTitleSection}>
                <Ionicons name="heart" size={20} color="#8A0030" />
                <Text style={styles.cardTitle}>{entry.brideName} Weds {entry.groomName}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Middle Section */}
            <View style={styles.cardMiddleSection}>
              {/* Left Column - Marriage Date */}
              <View style={styles.cardColumn}>
                <View style={styles.cardInfoRow}>
                  <Ionicons name="calendar-outline" size={18} color="#666" />
                  <Text style={styles.cardInfoLabel}>Marriage Date</Text>
                </View>
                <Text style={styles.cardInfoValue}>{formatDate(entry.date)}</Text>
              </View>

              {/* Right Column - Total Chandlo */}
              <View style={styles.cardColumn}>
                <View style={styles.cardInfoRow}>
                  <Ionicons name="cash-outline" size={18} color="#666" />
                  <Text style={styles.cardInfoLabel}>Total Chandlo</Text>
                </View>
                <Text style={styles.cardInfoValue}>{entry.amount}</Text>
              </View>
            </View>

            {/* Bottom Section - Wishes */}
            <View style={styles.cardBottomSection}>
              <Text style={styles.cardWishesLabel}>Wishes</Text>
              <Text style={styles.cardWishesValue}>{entry.wishes}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity 
        style={styles.floatingAddButton}
        onPress={() => router.push("/add-shagun")}
      >
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>

      {/* Sort By Modal */}
      <Modal
        visible={showSortModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSortModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowSortModal(false)}
          />
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <TouchableOpacity onPress={() => setShowSortModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Sort Options */}
            <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
              {/* Name Filter */}
              <View style={styles.sortOption}>
                <Text style={styles.sortOptionLabel}>Name</Text>
                <TextInput
                  style={styles.sortInput}
                  placeholder="Name"
                  placeholderTextColor="#999"
                  value={sortName}
                  onChangeText={setSortName}
                />
              </View>

              {/* Shagun Amount Filter */}
              <View style={styles.sortOption}>
                <Text style={styles.sortOptionLabel}>Shagun</Text>
                <RangeSlider
                  min={0}
                  max={10000}
                  lowValue={shagunLow}
                  highValue={shagunHigh}
                  onValueChange={(low, high) => {
                    setShagunLow(low);
                    setShagunHigh(high);
                  }}
                />
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={handleReset}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.nextButton}
                onPress={handleNext}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingBottom: Platform.OS === "ios" ? 88 : 64,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  iconContainer: {
    position: "relative",
    marginBottom: 48,
    alignItems: "center",
    justifyContent: "center",
    width: 240,
    height: 240,
  },
  decorativeDot: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E0E0E0",
  },
  decorativeCircle: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  primaryText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
    textAlign: "center",
  },
  secondaryText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 32,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#000",
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 10,
    minWidth: 180,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  searchSortContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    paddingHorizontal: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    gap: 6,
  },
  sortButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  countContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  countText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  shagunCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTopSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitleSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  cardMiddleSection: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 20,
  },
  cardColumn: {
    flex: 1,
  },
  cardInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  cardInfoLabel: {
    fontSize: 12,
    color: "#666",
  },
  cardInfoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  cardBottomSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  cardWishesLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  cardWishesValue: {
    fontSize: 14,
    color: "#000",
  },
  floatingAddButton: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 100 : 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  modalScrollView: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sortOption: {
    marginBottom: 24,
  },
  sortOptionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  sortInput: {
    height: 55,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#FFFFFF",
  },
  modalActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  resetButton: {
    flex: 1,
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  nextButton: {
    flex: 1,
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
