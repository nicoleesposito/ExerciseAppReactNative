import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

// a map is created to loop through each exercise and render each one
const exercises = [
    { name: "Running", key: "Running", suggested: "PushUps" },
    { name: "PushUps", key: "PushUps", suggested: "Plank" },
    { name: "Plank", key: "Plank", suggested: "Squats" },
    { name: "Squats", key: "Squats", suggested: "Running" }
];

// object created for exercise descriptions in each mode for varying screens.
const exerciseDescriptions = {
    Running: {
        duration: "Track how long you can run with a timer.",
        repetition: "Count how many laps you complete during your run.",
        countdown: "Run for the set time duration and see how far you can go."
    },
    PushUps: {
        duration: "See how long you can keep doing push-ups with a timer.",
        repetition: "Count your push-ups to track progress over time.",
        countdown: "Complete as many push-ups as possible before the timer runs out."
    },
    Plank: {
        duration: "Hold your plank and measure your endurance with a timer.",
        repetition: "Track how many plank reps you can complete.",
        countdown: "Hold your plank position until the countdown timer reaches zero."
    },
    Squats: {
        duration: "Track how long you can perform squats with a timer.",
        repetition: "Count how many squats you can do in a set.",
        countdown: "Set a time limit and squat until the timer runs out."
    }
};

export default function HomeScreen({ navigation }) {
    const [mode, setMode] = useState("");
    const [error, setError] = useState("");

    const handleModeSelection = (selectedMode) => {
        setMode(selectedMode); // Update mode state
        setError("");
    };

    // function to set an error if the user presses start before selecting duration or repetition
    const manageStart = (exerciseKey) => {
        if (!mode) {
            setError("Please select a mode before starting.");
        } else {
            const screen = mode === "duration" ? "DurationExercise" : "RepetitionExercise";
            navigation.push(screen, { exercise: exerciseKey, suggested: exercises.find(item => item.key === exerciseKey).suggested });
        }
    };

    //components displayed as html
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Hello,</Text>
            <Text style={styles.subHeader}>Choose an exercise and your method.</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.modeButton, mode === "duration" && styles.selected]} onPress={() => handleModeSelection("duration")}>
                    <Text style={styles.buttonText}>Duration</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modeButton, mode === "repetition" && styles.selected]} onPress={() => handleModeSelection("repetition")}>
                    <Text style={styles.buttonText}>Repetition</Text>
                </TouchableOpacity>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <FlatList
                data={exercises}
                renderItem={({ item }) => (
                    <View style={styles.exerciseBox}>
                        <Text style={styles.exerciseTitle}>{item.name}</Text>
                        <Text style={styles.description}>
                            {mode ? exerciseDescriptions[item.name]?.[mode] : "Select a mode to see details."}
                        </Text>
                        <TouchableOpacity style={styles.startButton} onPress={() => manageStart(item.key)}>
                            <Text style={styles.startButtonText}>Start</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

// react native stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#1E1E1E",
        alignItems: "center",
    },
    header: {
        fontSize: 40,
        fontWeight: "500",
        color: "#00FFDD",
        fontFamily: "Kodchasan",
        alignSelf: "flex-start"
    },
    subHeader: {
        fontSize: 18,
        color: "#fff",
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    modeButton: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#00FFDD",
        backgroundColor: "#1a1a1a"
    },
    selected: {
        backgroundColor: "#006b5d"
    },
    buttonText: {
        color: "#00FFDD",
        fontSize: 18,
        fontWeight: "bold"
    },
    errorText: {
        color: "red",
        marginBottom: 10
    },
    exerciseBox: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: "#3f504b",
        borderRadius: 10,
        width: "100%",
        borderColor: "#00FFDD",
        borderWidth: 2
    },
    exerciseTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#00FFDD"
    },
    description: {
        color: "#fff",
        marginBottom: 10
    },
    startButton: {
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#00FFDD",
        alignItems: "center"
    },
    startButtonText: {
        color: "#1E1E1E",
        fontSize: 18,
        fontWeight: "bold"
    }
});
