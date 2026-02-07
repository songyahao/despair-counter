import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { useDespair } from '../../context/DespairContext';
import CalendarHeader from './CalendarHeader';
import { dateUtils } from '../../utils/dateUtils';

const CalendarView = () => {
  const { despairData, toggleDespairStatus } = useDespair();
  const [currentView, setCurrentView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState('');
  
  // 动画值
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    updateCurrentMonth();
  }, [currentDate]);

  useEffect(() => {
    // 淡入和滑入动画
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentView]);

  const updateCurrentMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    setCurrentMonth(`${year}年${month}月`);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    
    const days = [];
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

    // 添加星期标题
    weekDays.forEach(day => {
      days.push(
        <View key={`week-${day}`} style={styles.weekDay}>
          <Text style={styles.weekDayText}>{day}</Text>
        </View>
      );
    });

    // 添加空白天
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.dayCell} />
      );
    }

    // 添加月份天数
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isDespair = despairData[dateString] || false;
      const isToday = dateString === dateUtils.getToday();

      days.push(
        <View 
          key={dateString} 
          style={[
            styles.dayCell,
            isToday && styles.todayCell
          ]}
        >
          <Text style={[
            styles.dayText,
            isToday && styles.todayText
          ]}>
            {day}
          </Text>
          {despairData[dateString] !== undefined && (
            <View style={[
              styles.statusDot,
              isDespair ? styles.despairDot : styles.hopeDot
            ]} />
          )}
        </View>
      );
    }

    return (
      <View style={styles.calendarGrid}>
        {days}
      </View>
    );
  };

  const renderYearView = () => {
    const year = currentDate.getFullYear();
    const months = [];

    for (let month = 1; month <= 12; month++) {
      const monthString = `${year}-${String(month).padStart(2, '0')}`;
      let despairCount = 0;
      let totalDays = new Date(year, month, 0).getDate();

      // 计算该月的绝望天数
      for (let day = 1; day <= totalDays; day++) {
        const dateString = `${monthString}-${String(day).padStart(2, '0')}`;
        if (despairData[dateString]) {
          despairCount++;
        }
      }

      months.push(
        <View key={monthString} style={styles.monthCard}>
          <Text style={styles.monthCardTitle}>{month}月</Text>
          <Text style={styles.monthCardCount}>
            绝望: {despairCount}天
          </Text>
          <Text style={styles.monthCardCount}>
            希望: {totalDays - despairCount}天
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.yearGrid}>
        {months}
      </View>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'month':
        return renderMonthView();
      case 'year':
        return renderYearView();
      default:
        return renderMonthView();
    }
  };

  return (
    <View style={styles.container}>
      <CalendarHeader
        currentMonth={currentMonth}
        onViewChange={handleViewChange}
        currentView={currentView}
      />
      <Animated.View 
        style={[
          styles.calendarCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarCard: {
    flex: 1,
    margin: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    overflow: 'hidden',
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
  content: {
    flex: 1,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
  weekDay: {
    width: '14.28%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  todayCell: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 12,
  },
  dayText: {
    fontSize: 18,
    color: '#1f2937',
    fontWeight: '500',
  },
  todayText: {
    fontWeight: 'bold',
    color: '#8b5cf6',
    fontSize: 20,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  despairDot: {
    backgroundColor: '#ef4444',
  },
  hopeDot: {
    backgroundColor: '#22c55e',
  },
  yearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  monthCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 20,
    margin: '1.66%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    justifyContent: 'center',
  },
  monthCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  monthCardCount: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default CalendarView;
