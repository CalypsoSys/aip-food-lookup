import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, FlatList, Text, StyleSheet } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [possible_allowed, setPossibleAllowed] = useState([]);
  const [possible_disallowed, setPossibleDisallowed] = useState([]);

  const isButtonEnabled = inputText.length > 2;
  const apiSourceUrl = "http://localhost:8080/";
  //const apiSourceUrl = "https://api.hashimojoe.com/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (inputText.length >= 3) {
          const response = await fetch(apiSourceUrl + `search?key=${inputText}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = await response.json();
          setPossibleAllowed(result.possible_allowed || []);
          setPossibleDisallowed(result.possible_disallowed || []);
        } else {
          setPossibleAllowed([]);
          setPossibleDisallowed([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    // Call fetchData when the component mounts and when inputText changes
    fetchData();
  }, [inputText]);

  const suggestFood = async (allowed) => {
    try {
      const response = await fetch(apiSourceUrl + 'suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputText,
          allowed,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle successful response
    } catch (error) {
      console.error('Error making POST request:', error.message);
    }
  };
 
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
          renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
          style={possible_allowed.length > 0 ? styles.flatListWithBorder : null}
          scrollEnabled={true}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>NOT Allowed on API:</Text>
        <FlatList
          data={possible_disallowed}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
          style={possible_disallowed.length > 0 ? styles.flatListWithBorder : null}
          scrollEnabled={true}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Suggest as Allowed"
          onPress={() => suggestFood(true)}
          disabled={!isButtonEnabled}
        />
        {/* Add some spacing between the buttons */}
        <View style={styles.buttonSpacing} />
        <Button
          title="Suggest as NOT Allowed"
          onPress={() => suggestFood(false)}
          disabled={!isButtonEnabled}
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
    backgroundColor: '#f5f5f5', // Light gray background
  },
  input: {
    height: 40,
    borderColor: '#ddd', // Light gray border
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff', // White background
  },
  listContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  flatListWithBorder: {
    borderWidth: 1,
    borderColor: '#ddd', // Light gray border
    borderRadius: 5, // Optional: Add border radius for a rounded look
    maxHeight: 160
  },
  listItem: {
    height: 40,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fff', // White background
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonSpacing: {
    width: 16, // Adjust the spacing as needed
  },
});
