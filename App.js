import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome } from '@expo/vector-icons';

// Custom component for each question
const Question = ({ image, options, onChange }) => (
    <View style={styles.questionContainer}>
        <Image source={image} style={styles.image} />
        <Text style={styles.questionText}>What football club is this?</Text>
        <RNPickerSelect
            onValueChange={onChange}
            items={options.map(option => ({ label: option, value: option }))}
        />
    </View>
);

export default function App() {
    const [answers, setAnswers] = useState(['', '', '']);
    const correctAnswers = ['Arsenal', 'Barcelona', 'Chelsea'];

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        let score = 0;
        correctAnswers.forEach((answer, index) => {
            if (answer === answers[index]) {
                score++;
            }
        });
        Alert.alert(`You got ${score} out of 3 correct!`);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>Football Club Quiz</Text>
                    <FontAwesome name="soccer-ball-o" size={30} color="black" />
                </View>
                <Question
                    image={require('./img/Arsenal-Logo.png')}
                    options={['Arsenal', 'Barcelona', 'Chelsea']}
                    onChange={(value) => handleAnswerChange(0, value)}
                />
                <Question
                    image={require('./img/barcelona.png')}
                    options={['Arsenal', 'Barcelona', 'Chelsea']}
                    onChange={(value) => handleAnswerChange(1, value)}
                />
                <Question
                    image={require('./img/chelsea.png')}
                    options={['Arsenal', 'Barcelona', 'Chelsea']}
                    onChange={(value) => handleAnswerChange(2, value)}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Submit Answers" onPress={handleSubmit} color="#1E90FF" />
                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f8ff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginRight: 10,
        borderStyle: 'solid',
        borderColor: '#1E90FF',
        borderWidth: 2,
        borderRadius: 12,
        padding: 10,
        color: '#1E90FF',
        backgroundColor: '#f0f8ff',
    },
    questionContainer: {
        marginBottom: 30,
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor: '#fff',
        padding: 15,
    },
    questionText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',

    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 50,
        alignItems: 'center',
    },
});
