import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SleepTracker = () => {
    const [sleepTime, setSleepTime] = useState(new Date());
    const [wakeTime, setWakeTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [currentPicker, setCurrentPicker] = useState(null); // 'sleep' or 'wake'

    useEffect(() => {
        loadTimes();
    }, []);

    const loadTimes = async () => {
        const storedSleepTime = await AsyncStorage.getItem('sleepTime');
        const storedWakeTime = await AsyncStorage.getItem('wakeTime');
        if (storedSleepTime) setSleepTime(new Date(storedSleepTime));
        if (storedWakeTime) setWakeTime(new Date(storedWakeTime));
    };

    const saveTimes = async () => {
        await AsyncStorage.setItem('sleepTime', sleepTime.toISOString());
        await AsyncStorage.setItem('wakeTime', wakeTime.toISOString());
    };

    const formatDate = (date) => {
        return `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    const onChange = (event, selectedDate) => {
        let currentDate = selectedDate || (currentPicker === 'sleep' ? sleepTime : wakeTime);
        setShowPicker(false);

        if (currentPicker === 'sleep') {
            setSleepTime(currentDate);
        } else {
            setWakeTime(currentDate);
        }
    };

    const showTimepicker = (picker) => {
        setShowPicker(true);
        setCurrentPicker(picker);
    };

    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>Today: {new Date().toLocaleDateString()}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => showTimepicker('sleep')}
                    title="Set Sleep Time"
                    style={styles.button}
                />
                <Button
                    onPress={() => showTimepicker('wake')}
                    title="Set Wake Time"
                    style={styles.button}
                />
                <Button
                    onPress={saveTimes}
                    title="Save"
                    style={styles.button} // Assuming you want the button styled similarly to the others
                />
            </View>
            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={currentPicker === 'sleep' ? sleepTime : wakeTime}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>Sleep Time: {formatDate(sleepTime)}</Text>
                <Text style={styles.timeText}>Wake Time: {formatDate(wakeTime)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    dateText: {
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        height: 60, // Adjusted height of the buttons
        width: '40%', // Adjusted width of the buttons
    },
    timeContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    timeText: {
        marginBottom: 10,
    },
});

export default SleepTracker;






