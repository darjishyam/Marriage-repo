import { Ionicons } from "@expo/vector-icons";
import {
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

import { useExpense } from "@/contexts/ExpenseContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function AddExpenseScreen() {
    const router = useRouter();
    const { addExpense } = useExpense();
    const { t } = useLanguage();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [paidAmount, setPaidAmount] = useState("");
    const [loading, setLoading] = useState(false);

    // Calculate pending amount
    const total = parseFloat(amount) || 0;
    const paid = parseFloat(paidAmount) || 0;
    const pending = total > paid ? total - paid : 0;

    const handleSave = async (shouldGoBack: boolean) => {
        if (!title || !amount) {
            Toast.show({
                type: "error",
                text1: t("error"),
                text2: t("enter_title_amount"),
            });
            return;
        }

        const numAmount = parseFloat(amount);
        const numPaid = parseFloat(paidAmount) || 0;

        if (isNaN(numAmount) || numAmount <= 0) {
            Toast.show({
                type: "error",
                text1: t("error"),
                text2: t("enter_valid_amount"),
            });
            return;
        }

        if (numPaid > numAmount) {
            Toast.show({
                type: "error",
                text1: t("error"),
                text2: t("paid_amount_error"),
            });
            return;
        }

        setLoading(true);
        try {
            await addExpense(title, numAmount, numPaid, "Other");
            Toast.show({
                type: "success",
                text1: t("success"),
                text2: t("expense_added_success"),
            });
            if (shouldGoBack) {
                router.replace("/expenses");
            } else {
                setTitle("");
                setAmount("");
                setPaidAmount("");
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: t("error"),
                text2: t("failed_add_expense"),
            });
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
                    onPress={() => router.navigate('/(tabs)')}
                >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>{t("add_new_expense")}</Text>
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
                    <View style={styles.formContainer}>

                        {/* Expense For */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>{t("expense_for")}</Text>
                            <TextInput
                                style={[styles.input, Platform.OS === 'web' && ({ outlineStyle: 'none' } as any)]}
                                placeholder=""
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        {/* Total Amount */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>{t("total_amount")}</Text>
                            <TextInput
                                style={[styles.input, Platform.OS === 'web' && ({ outlineStyle: 'none' } as any)]}
                                placeholder="₹ 0"
                                value={amount ? `₹ ${amount}` : ''}
                                onChangeText={(text) => setAmount(text.replace(/[^0-9.]/g, ''))}
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Paid Deposit Amount */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>{t("paid_deposit_amount")}</Text>
                            <TextInput
                                style={[styles.input, Platform.OS === 'web' && ({ outlineStyle: 'none' } as any)]}
                                placeholder="₹ 0"
                                value={paidAmount ? `₹ ${paidAmount}` : ''}
                                onChangeText={(text) => setPaidAmount(text.replace(/[^0-9.]/g, ''))}
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Pending Amount */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>{t("pending_amount")}</Text>
                            <TextInput
                                style={[styles.input, Platform.OS === 'web' && ({ outlineStyle: 'none' } as any)]}
                                placeholder="₹ 0"
                                value={`₹ ${pending}`}
                                editable={false}
                            />
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
                    <Text style={styles.saveMoreButtonText}>{t("save_and_add_another")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => handleSave(true)}
                    disabled={loading}
                >
                    <Text style={styles.saveButtonText}>{loading ? "Saving..." : t("save")}</Text>
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
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: "#999",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#F0F0F0",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: "#000",
        fontWeight: "600",
    },
    footer: {
        padding: 20,
        paddingBottom: Platform.OS === "ios" ? 34 : 20,
        backgroundColor: "#FFFFFF",
        gap: 12,
    },
    saveMoreButton: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    saveMoreButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "600",
    },
    saveButton: {
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
