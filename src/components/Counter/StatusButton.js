import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

const StatusButton = ({ isDespair, onPress }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.button,
          isDespair ? styles.despairButton : styles.hopeButton
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.buttonText,
          isDespair ? styles.despairText : styles.hopeText
        ]}>
          {isDespair ? '今天很绝望' : '今天不绝望'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  despairButton: {
    backgroundColor: '#ec4899',
  },
  hopeButton: {
    backgroundColor: '#8b5cf6',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  despairText: {
    color: '#ffffff',
  },
  hopeText: {
    color: '#ffffff',
  },
});

export default StatusButton;
