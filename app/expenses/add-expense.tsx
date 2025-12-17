import { useExpense } from "@/contexts/ExpenseContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddExpenseScreen() {
    const router = useRouter();
    const { addExpense } = useExpense();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    // Predefined categories for quick selection
    const categories = ["Venue", "Catering", "Decoration", "Photography", "Attire", "Other"];

    const handleSave = async (shouldGoBack: boolean) => {
        if (!title || !amount) {
            Alert.alert("Error", "Please enter title and amount");
            return;
        }

        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            Alert.alert("Error", "Please enter a valid amount");
            return;
        }

        setLoading(true);
        try {
            await addExpense(title, numAmount, category || "Other");
            Alert.alert("Success", "Expense added successfully");
            if (shouldGoBack) {
                // Redirect to Home as per pattern, or back to list? 
                // User requested: "displayed at my weddings dashboard... by clicking on expense it should display all"
                // Let's go to /expenses list to confirm it's there.
                router.replace("/expenses");
            } else {
                setTitle("");
                setAmount("");
                setCategory("");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to add expense");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Navigation Bar */}
            <View style={styles.navBar}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Add Expense</Text>
                <View style={styles.placeholder} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Form Fields */}
                    <View style={styles.formContainer}>

                        {/* Amount Input (Big) */}
                        <View style={styles.amountContainer}>
                            <Text style={styles.currencySymbol}>₹</Text>
                            <TextInput
                                style={styles.amountInput}
                                placeholder="0"
                                placeholderTextColor="#DDD"
                                value={amount}
                                onChangeText={setAmount}
                                keyboardType="numeric"
                            />
                        </View>
                        <Text style={styles.inputLabelCenter}>Enter Amount</Text>

                        {/* Title Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Expense Title</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Wedding Cake"
                                placeholderTextColor="#999"
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        {/* Category Selection */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Category</Text>
                            <View style={styles.categoryContainer}>
                                {categories.map((cat) => (
                                    <TouchableOpacity
                                        key={cat}
                                        style={[styles.categoryChip, category === cat && styles.categoryChipSelected]}
                                        onPress={() => setCategory(cat)}
                                    >
                                        <Text style={[styles.categoryText, category === cat && styles.categoryTextSelected]}>{cat}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Footer Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.saveMoreButton}
                    onPress={() => handleSave(false)}
                    disabled={loading}
                >
                    <Text style={styles.saveMoreButtonText}>Save & Add More</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => handleSave(true)}
                    disabled={loading}
                >
                    <Text style={styles.saveButtonText}>{loading ? "Saving..." : "Save"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    navBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    navTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
    },
    placeholder: {
        width: 40,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    formContainer: {
        marginTop: 20,
    },
    // Amount Styles
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 8,
    },
    currencySymbol: {
        fontSize: 40,
        fontWeight: '700',
        color: '#000',
        marginRight: 8,
    },
    amountInput: {
        fontSize: 48,
        fontWeight: '700',
        color: '#000',
        minWidth: 100,
        textAlign: 'center',
    },
    inputLabelCenter: {
        textAlign: 'center',
        color: '#999',
        marginBottom: 40,
    },

    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#F5F5F5",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: "#000",
    },

    // Category Chips
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    categoryChipSelected: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    categoryText: {
        fontSize: 14,
        color: '#666',
    },
    categoryTextSelected: {
        color: '#FFF',
        fontWeight: '600',
    },

    footer: {
        flexDirection: "row",
        padding: 20,
        paddingBottom: Platform.OS === "ios" ? 34 : 20,
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
        backgroundColor: "#FFFFFF",
        gap: 12,
    },
    saveMoreButton: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E6E6E6",
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    saveMoreButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "600",
    },
    saveButton: {
        flex: 1,
        backgroundColor: "#000",
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    saveButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
});
