import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CalendarView from '../components/Calendar/CalendarView';

const CalendarScreen = () => {
  return (
    <LinearGradient
      colors={['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.content}>
        <CalendarView />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
});

export default CalendarScreen;
