import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import React, { useReducer, useState } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { list: action.payload }];
    case 'remove': {
      state.pop();
      return [...state];
    }
    default:
      return state;
  }
};

const Index = () => {
  const [input, setInput] = useState('');
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To-Do App</Text>

      <TextInput
        placeholder="ADD TASK"
        onChangeText={(text) => setInput(text)}
        value={input}
        style={styles.input}
      />

      <View style={styles.buttonGroup}>
        <Button
          title="Add Task"
          color="#4CAF50"
          onPress={() => {
           if(input!=''){
            dispatch({ type: 'ADD', payload: input });
            setInput('');
          }}}
        />
        <Button
          title="Remove"
          color="#f44336"
          onPress={() => dispatch({ type: 'remove', payload: input })}
        />
      </View>

      <FlatList
        data={state}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item.list}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  listItem: {
    padding: 12,
    fontSize: 16,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginBottom: 8,
  },
});

export default Index;
