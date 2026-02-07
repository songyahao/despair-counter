import React, { createContext, useState, useEffect, useContext } from 'react';
import { StorageService } from '../services/StorageService';

export const DespairContext = createContext();

export const DespairProvider = ({ children }) => {
  const [despairData, setDespairData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDespairData();
  }, []);

  const loadDespairData = async () => {
    try {
      setIsLoading(true);
      const data = await StorageService.getAllDespairData();
      setDespairData(data);
    } catch (error) {
      console.error('Error loading despair data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDespairStatus = async (date) => {
    try {
      const currentStatus = despairData[date] || false;
      const newStatus = !currentStatus;
      await StorageService.saveDespairStatus(date, newStatus);
      setDespairData(prev => ({
        ...prev,
        [date]: newStatus
      }));
    } catch (error) {
      console.error('Error toggling despair status:', error);
    }
  };

  const getDespairStatus = (date) => {
    return despairData[date] || false;
  };

  const getCalendarMarkedDates = () => {
    const markedDates = {};
    
    Object.entries(despairData).forEach(([date, isDespair]) => {
      markedDates[date] = {
        marked: true,
        dotColor: isDespair ? '#ef4444' : '#22c55e'
      };
    });

    return markedDates;
  };

  const value = {
    despairData,
    isLoading,
    toggleDespairStatus,
    getDespairStatus,
    getCalendarMarkedDates,
    loadDespairData
  };

  return (
    <DespairContext.Provider value={value}>
      {children}
    </DespairContext.Provider>
  );
};

export const useDespair = () => {
  const context = useContext(DespairContext);
  if (!context) {
    throw new Error('useDespair must be used within a DespairProvider');
  }
  return context;
};
