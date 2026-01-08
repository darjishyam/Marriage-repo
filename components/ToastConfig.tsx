import { FontAwesome } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';

/*
  Custom Toast Config to match the "Quickblog" style:
  - White background
  - Rounded corners (Pill/Card shape)
  - Drop shadow
  - Custom Icons
*/

export const toastConfig: ToastConfig = {
    // Overwriting 'success' type
    success: (props) => (
        <View style={styles.toastContainer}>
            <View style={[styles.iconContainer, { backgroundColor: '#4CAF50' }]}>
                <FontAwesome name="check" size={14} color="white" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text1}>{props.text1}</Text>
                {props.text2 && <Text style={styles.text2}>{props.text2}</Text>}
            </View>
        </View>
    ),

    // Overwriting 'error' type
    error: (props) => (
        <View style={styles.toastContainer}>
            <View style={[styles.iconContainer, { backgroundColor: '#F44336' }]}>
                <FontAwesome name="times" size={14} color="white" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text1}>{props.text1}</Text>
                {props.text2 && <Text style={styles.text2}>{props.text2}</Text>}
            </View>
        </View>
    ),

    // Overwriting 'info' type
    info: (props) => (
        <View style={styles.toastContainer}>
            <View style={[styles.iconContainer, { backgroundColor: '#2196F3' }]}>
                <FontAwesome name="info" size={14} color="white" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text1}>{props.text1}</Text>
                {props.text2 && <Text style={styles.text2}>{props.text2}</Text>}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    toastContainer: {
        height: 60,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 12, // Pill/Card shape
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
            web: {
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            },
        }),
        marginTop: 10,
        borderLeftWidth: 0, // Removed default colored border
    },
    iconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12, // Circle
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    text1: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    text2: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    }
});
