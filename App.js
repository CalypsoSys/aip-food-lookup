import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.hashimojoe.com/?key=${inputText}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData1(result.possible_allowed || []);
      setData2(result.possible_disallowed || []);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a food"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <Button title="Lookup AIP Food" onPress={fetchData} />

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Allowed on AIP:</Text>
        <FlatList
          data={data1}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Not Allowed on AIP:</Text>
        <FlatList
          data={data2}
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
