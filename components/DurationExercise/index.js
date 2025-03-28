import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function DurationExercise({ route, navigation }) {
    const { exercise } = route.params;

    // state for controlling the timer and button visibility
    const [running, setRunning] = useState(false);
    const [curTime, setCurTime] = useState(0);
    const [showSuggestedButton, setShowSuggestedButton] = useState(true);  // controls visibility of the suggested button
    const intervalId = useRef(null);
    const startTime = useRef(0);

    // effect to manage the timer
    useEffect(() => {
        if (running) {
            startTime.current = Date.now() - curTime;
            intervalId.current = setInterval(() => {
                setCurTime(Date.now() - startTime.current);
            }, 10);
        } else {
            clearInterval(intervalId.current);
        }

        return () => clearInterval(intervalId.current);
    }, [running]);

    // functions for starting, stopping, and resetting the timer
    const start = () => setRunning(true);
    const stop = () => setRunning(false);
    const reset = () => {
        setRunning(false);
        setCurTime(0);
    };

    // formatting the timer's digits
    const timeFormat = () => {
        let minutes = Math.floor((curTime / (1000 * 60)) % 60);
        let seconds = Math.floor((curTime / 1000) % 60);
        let milliseconds = Math.floor((curTime % 1000) / 10);
        // Padding the values to format the zeros
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
    };

    // suggested button functionality (suggest an exercise and hide the button)
    const handleSuggestedPress = () => {
        setShowSuggestedButton(false);
        // navigate to the Push ups exercise and hides the button
        navigation.push("DurationExercise", { exercise: "Push-ups", hideSuggestedButton: true });
    };

    useEffect(() => {
        if (route.params?.hideSuggestedButton) {
            setShowSuggestedButton(false);
        }
    }, [route.params]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>{"< Back"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestedButton} onPress={() => navigation.popToTop()}>
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.exerciseName}>{exercise}</Text>
                <Text style={styles.mode}>Duration</Text>
            </View>

            {/* timer display */}
            <View style={styles.timerContainer}>
                <Text style={styles.timer}>{timeFormat()}</Text>
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.button} onPress={start}>
                        <Text style={styles.buttonText}>Start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={stop}>
                        <Text style={styles.buttonText}>Stop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={reset}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                </View>
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
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        backgroundColor: "#1E1E1E",
    },
    backButton: {
        justifyContent: "left",
        margin: 10,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.35)",
    },
    backText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#00FFDD",
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    exerciseName: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
    },
    mode: {
        fontSize: 18,
        color: "#aaa",
    },
    timerContainer: {
        marginVertical: 20,
        padding: 50,
        borderRadius: 30,
        backgroundColor: "#3f504b",
        border: "1px solid #00FFDD",
    },
    timer: {
        fontSize: 50,
        fontWeight: "500",
        color: "#fff",
        textAlign: "center",
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#1a1a1a",
        padding: 12,
        borderRadius: 30,
        width: 120,
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #00FFDD",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.35)",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
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
