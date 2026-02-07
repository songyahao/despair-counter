import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import { DespairProvider } from './src/context/DespairContext';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  return (
    <DespairProvider>
      <View style={styles.container}>
        {currentScreen === 'home' ? <HomeScreen /> : <CalendarScreen />}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, currentScreen === 'home' && styles.activeTab]}
            onPress={() => setCurrentScreen('home')}
          >
            <Ionicons 
              name={currentScreen === 'home' ? 'home' : 'home-outline'} 
              size={24} 
              color={currentScreen === 'home' ? '#8b5cf6' : '#6b7280'} 
            />
            <Text style={[styles.tabText, currentScreen === 'home' && styles.activeTabText]}>
              绝望计数
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, currentScreen === 'calendar' && styles.activeTab]}
            onPress={() => setCurrentScreen('calendar')}
          >
            <Ionicons 
              name={currentScreen === 'calendar' ? 'calendar' : 'calendar-outline'} 
              size={24} 
              color={currentScreen === 'calendar' ? '#8b5cf6' : '#6b7280'} 
            />
            <Text style={[styles.tabText, currentScreen === 'calendar' && styles.activeTabText]}>
              绝望日历
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DespairProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#8b5cf6',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  activeTabText: {
    color: '#8b5cf6',
    fontWeight: '500',
  },
});