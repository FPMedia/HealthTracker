import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import SleepTracker from './Components/SleepTracker';
import GoogleSheetsUploader from './Components/GoogleSheetsUploader';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SleepTracker />
      <GoogleSheetsUploader />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
