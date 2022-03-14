import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import MyNavMenu from "../nav-bar/MyNavMenu";
import TodoItem from "../Components/TodoItem";
import AddTodo from "../Components/addTodo";

const CategoryScreen = () => {
  const [todos, setTodos] = useState([
    { text: "Pantry", key: "1" },
    { text: "Fridge", key: "2" },
    { text: "Fruit", key: "3" },
  ]);

  {
    /*   This is a function that does the deleting from the list by long pressing on the item */
  }
  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    setTodos((prevTodos) => {
      return [{ text: text, key: Math.random().toString() }, ...prevTodos];
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.list}>
          {/*   this list thru array and display   */}

          <FlatList
            style={styles.flatList}
            nestedScrollEnabled
            inverted
            data={todos}
            renderItem={({ item }) => (
              <TodoItem item={item} pressHandler={pressHandler} />
            )}
          />
        </View>

        {/*   Content   */}
        <AddTodo submitHandler={submitHandler} />
      </View>
      <MyNavMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#E8EAED",
    flex: 1,
    justifyContent: "center",
  },
  list: {
    borderWidth: 1,
    width: "100%",
    height: "82%",
    marginBottom: 20,
  },
  flatList: {
    flexDirection: "column-reverse",
  },
});

export default CategoryScreen;
