import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DespairCounter from '../components/Counter/DespairCounter';

const HomeScreen = () => {
  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#dbeafe', '#bfdbfe']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.content}>
        <DespairCounter />
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

export default HomeScreen;
