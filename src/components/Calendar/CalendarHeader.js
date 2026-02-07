import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CalendarHeader = ({ currentMonth, onViewChange, currentView }) => {
  const views = [
    { key: 'week', label: '周' },
    { key: 'month', label: '月' },
    { key: 'year', label: '年' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.monthText}>{currentMonth}</Text>
      <View style={styles.viewSelector}>
        {views.map(view => (
          <TouchableOpacity
            key={view.key}
            style={[
              styles.viewButton,
              currentView === view.key && styles.activeViewButton
            ]}
            onPress={() => onViewChange(view.key)}
          >
            <Text style={[
              styles.viewButtonText,
              currentView === view.key && styles.activeViewButtonText
            ]}>
              {view.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  viewSelector: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    padding: 2,
  },
  viewButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  activeViewButton: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  viewButtonText: {
    fontSize: 14,
    color: '#6b7280',
  },
  activeViewButtonText: {
    color: '#1f2937',
    fontWeight: '500',
  },
});

export default CalendarHeader;
