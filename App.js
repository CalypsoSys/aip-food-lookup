import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [possible_allowed, setPossibleAllowed] = useState([]);
  const [possible_disallowed, setPossibleDisallowed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (inputText.length >= 3) {
          const response = await fetch(`https://api.hashimojoe.com/?key=${inputText}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          setPossibleAllowed(result.possible_allowed || []);
          setPossibleDisallowed(result.possible_disallowed || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    // Call fetchData when the component mounts and when inputText changes
    fetchData();
  }, [inputText]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a food to check"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Allowed on AIP:</Text>
        <FlatList
          data={possible_allowed}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>NOT Allowed on API:</Text>
        <FlatList
          data={possible_disallowed}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  listContainer: {
    marginTop: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
