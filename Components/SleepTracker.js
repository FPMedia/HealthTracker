import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SleepTracker = () => {
    const [sleepTime, setSleepTime] = useState(null);
    const [wakeTime, setWakeTime] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [currentPicker, setCurrentPicker] = useState(null); // 'sleep' or 'wake'
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

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
        setIsSaving(true); // Show spinner
        await AsyncStorage.setItem('sleepTime', sleepTime.toISOString());
        await AsyncStorage.setItem('wakeTime', wakeTime.toISOString());
        setIsSaving(false); // Hide spinner
        setSaveMessage('Times saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000); // Clear message after 3 seconds
    };

    const formatDate = (date) => {
        return date ? `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : '';
    };

    const onChange = (event, selectedDate) => {
        let currentDate = selectedDate;
        setShowPicker(false);
        if (!currentDate) return; // Exit if the change was dismissed

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
                    disabled={!(sleepTime && wakeTime)} // Disabled unless both times are set
                    style={styles.button}
                />
            </View>
            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
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
            {isSaving && <ActivityIndicator size="large" />}
            {saveMessage !== '' && <Text style={styles.saveMessage}>{saveMessage}</Text>}
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
        // Add styles as needed
    },
    timeContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    timeText: {
        marginBottom: 10,
    },
    saveMessage: {
        marginTop: 20,
        color: 'green',
    },
});

export default SleepTracker;
