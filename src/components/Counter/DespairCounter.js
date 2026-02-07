import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useDespair } from '../../context/DespairContext';
import { dateUtils } from '../../utils/dateUtils';
import StatusButton from './StatusButton';

const DespairCounter = () => {
  const { toggleDespairStatus, getDespairStatus } = useDespair();
  const [today, setToday] = useState(dateUtils.getToday());
  const [isDespair, setIsDespair] = useState(false);
  
  // 动画值
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 淡入动画
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const todayStatus = getDespairStatus(today);
    setIsDespair(todayStatus);
  }, [today, getDespairStatus]);

  useEffect(() => {
    // 状态切换动画
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isDespair]);

  const handleToggleStatus = () => {
    toggleDespairStatus(today);
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ scale: fadeAnim }]
          }
        ]}
      >
        <Text style={styles.title}>今日状态</Text>
        <Text style={styles.date}>{today}</Text>
        <Animated.View 
          style={[
            styles.statusContainer,
            {
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Text style={[
            styles.statusText,
            isDespair ? styles.despairText : styles.hopeText
          ]}>
            {isDespair ? '😔 今天很绝望' : '😊 今天不绝望'}
          </Text>
        </Animated.View>
        <StatusButton
          isDespair={isDespair}
          onPress={handleToggleStatus}
        />
        <Text style={styles.tip}>
          点击按钮切换今日状态
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
    textAlign: 'center',
  },
  date: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 48,
    textAlign: 'center',
  },
  statusContainer: {
    marginVertical: 32,
    paddingVertical: 32,
    paddingHorizontal: 48,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  statusText: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 40,
  },
  despairText: {
    color: '#ec4899',
  },
  hopeText: {
    color: '#8b5cf6',
  },
  tip: {
    marginTop: 32,
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});

export default DespairCounter;
