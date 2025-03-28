import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RepetitionExercise({ route, navigation }) {
    const { exercise } = route.params;  // get exercise name from route params

    const [count, setCount] = useState(0);
    const [showSuggestedButton, setShowSuggestedButton] = useState(true);  // controls visibility of the suggested button

    // function to increase the count
    function increaseCount() {
        setCount(count + 1);
    }

    // function to decrease the count, no less than 0
    function decreaseCount() {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    // function to reset the counter back to 0
    function resetCount() {
        setCount(0);
    }

    // Handle suggested button press (suggest Push-ups and hide the button)
    const handleSuggestedPress = () => {
        setShowSuggestedButton(false);  // Hide the suggested button
        // Navigate to the "Push-ups" exercise and pass state to indicate the button was pressed
        navigation.push("RepetitionExercise", { exercise: "Push-ups", hideSuggestedButton: true });
    };

    // if the excerise is Push Ups then the button will dissapear
    useEffect(() => {
        if (route.params?.hideSuggestedButton) {
            setShowSuggestedButton(false);
        }
    }, [route.params]);

    // components displayed as HTML
    return (
        <View style={styles.repetitionContainer}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>{"< Back"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestedButton} onPress={() => navigation.popToTop()}>
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <View style={styles.repetitionHeader}>
                <Text style={styles.exerciseName}>{exercise}</Text>
                <Text style={styles.repetitionType}>
                    {exercise === "Running" ? "Laps" : "Repetition"}
                </Text>
            </View>

            {/* counter */}
            <View style={styles.counterContainer}>
                <View style={styles.counter}>
                    <TouchableOpacity style={styles.button} onPress={decreaseCount}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.currentNumber}>
                        <Text style={styles.numberText}>{count}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={increaseCount}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.resetButton} onPress={resetCount}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
            {showSuggestedButton && (
                <TouchableOpacity
                    style={styles.suggestedButton}
                    onPress={handleSuggestedPress}
                >
                    <Text style={styles.buttonText}>Suggested: Push-ups</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

// react native stylesheet
const styles = StyleSheet.create({
    repetitionContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#1E1E1E",
        alignItems: "center",
    },
    backBtn: {
        justifyContent: "left",
        display: "block",
        margin: 10,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.35)",
    },
    backText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#00FFDD",
    },
    repetitionHeader: {
        alignItems: "center",
        marginBottom: 20,
    },
    exerciseName: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
    },
    repetitionType: {
        fontSize: 18,
        color: "#aaa",
    },
    counterContainer: {
        marginVertical: 20,
        padding: 30,
        borderRadius: 30,
        backgroundColor: "#3f504b",
        borderWidth: 1,
        borderColor: "#00FFDD",
    },
    counter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#242A29",
        padding: 5,
        borderRadius: 10,
        width: 70,
        margin: 15,
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid transparent",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.35)",
    },
    buttonText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "500",
    },
    currentNumber: {
        backgroundColor: "#566f67",
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#00FFDD",
        fontSize: 50,
        fontWeight: "500",
        color: "#fff",
    },
    numberText: {
        fontSize: 50,
        fontWeight: "500",
        color: "#fff",
        padding: 40,
    },
    resetButton: {
        marginTop: 20,
        margin: "auto",
        backgroundColor: "#1a1a1a",
        padding: 12,
        borderRadius: 30,
        width: 120,
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid transparent",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.35)",
    },
    suggestedButton: {
        backgroundColor: "#3f504b",
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 20,
        alignItems: "center",
    },
});
