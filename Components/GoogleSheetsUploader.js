import React from 'react';
import { View, Button, Alert } from 'react-native';
import axios from 'axios';

const GoogleSheetsUploader = () => {
    const sendDataToSheet = async (date, sleepTime, wakeTime) => {
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbxqMSE4wUDXFogpBwQhvopngEexNq2uNtZL4NG5o-FhrzyJg44Sc8ky5WDaNFvariI/exec';
        const postData = {
            date: date,
            sleepTime: sleepTime,
            wakeTime: wakeTime,
        };

        try {
            const response = await axios.post(scriptUrl, postData);
            if (response.data.result === 'success') {
                Alert.alert("Success", "Data sent to Google Sheets successfully.");
            } else {
                Alert.alert("Error", "Data was not saved. Please try again.");
            }
        } catch (error) {
            console.error("Error sending data to Google Sheets", error);
            Alert.alert("Error", "An error occurred while sending data to Google Sheets.");
        }
    };

    return (
        <View>
            {/* For demonstration, sending hardcoded data. Replace with dynamic data as needed. */}
            <Button
                title="Send Data to Google Sheets"
                onPress={() => sendDataToSheet('2024-04-01', '22:00', '06:00')}
            />
        </View>
    );
};

export default GoogleSheetsUploader;
