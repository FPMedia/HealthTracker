import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SleepTracker = () => {
    const [sleepTime, setSleepTime] = useState(new Date());
    const [wakeTime, setWakeTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [currentPicker, setCurrentPicker] = useState('sleep');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || (currentPicker === 'sleep' ? sleepTime : wakeTime);
        setShowPicker(Platform.OS === 'ios');
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
        <View>
            <View>
                <Button onPress={() => showTimepicker('sleep')} title="Set Sleep Time" />
            </View>
            <View>
                <Button onPress={() => showTimepicker('wake')} title="Set Wake Time" />
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
        </View>
    );
};

export default SleepTracker;
