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
            style={{ inputAndroid: styles.picker }}
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
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Football Club Quiz</Text>
                        <FontAwesome name="soccer-ball-o" size={30} color="white" style={styles.icon} />
                    </View>
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
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#789DBC',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginRight: 10,
    },
    icon: {
        marginLeft: 10,
    },
    questionContainer: {
        marginBottom: 30,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        padding: 15,
        width: '90%',
        alignSelf: 'center',
    },
    questionText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    picker: {
        fontSize: 16,
        color: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#1E90FF',
        borderWidth: 1,
        borderRadius: 8,
        width: '80%',
        alignSelf: 'center',
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 50,
        alignItems: 'center',
    },
});
