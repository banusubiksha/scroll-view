import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const App = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://10.0.2.2:8080');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (e) => {
      console.log('Raw message received:', e.data); // Log the raw data
      try {
        const message = JSON.parse(e.data);
        setUpdates((prevUpdates) => [...prevUpdates, message]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.onerror = (e) => {
      console.error('WebSocket error', e.message);
    };

    ws.onclose = (e) => {
      console.log('WebSocket connection closed', e.code, e.reason);
    };

    // Clean up the WebSocket connection when the component is unmounted
    return () => {
      ws.close();
    };
  }, []);

  return (
    <ScrollView>
      {updates.map((update, index) => (
        <View key={index} style={styles.updateContainer}>
          <Text style={styles.timestamp}>{update.timestamp}</Text>
          {Array.isArray(update.content) ? (
            update.content.map((message, idx) => (
              <Text key={idx} style={styles.message}>{message}</Text>
            ))
          ) : (
            <Text style={styles.message}>Invalid content format</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  updateContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  timestamp: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    marginBottom: 5,
  },
});

export default App;
