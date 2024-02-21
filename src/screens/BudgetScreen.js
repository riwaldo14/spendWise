import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";

const ToggleSwitch = () => {
  const [selectedOption, setSelectedOption] = useState("expense");
  const positionAnim = useRef(new Animated.Value(0)).current;

  const toggleSwitch = (newPosition, option) => {
    setSelectedOption(option);

    Animated.spring(positionAnim, {
      toValue: newPosition,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const options = [
    { label: "Expense", value: "expense" },
    { label: "Income", value: "income" },
    { label: "Transfer", value: "transfer" },
  ];

  const translateX = positionAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [5, 136, 267], // Adjust this value based on your desired movement
  });

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        {options.map((item, index) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => toggleSwitch(index, item.value)}
            style={[
              styles.toggle,
              index === 0 && { borderLeftWidth: 1 },
              index === options.length - 1 && styles.lastToggle,
            ]}
          >
            <Text>{item.label}</Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  toggle: {
    zIndex: 100,
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  lastToggle: {
    borderRightWidth: 1,
  },
  indicator: {
    zIndex: 0,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 120,
    height: "100%",
    backgroundColor: "green",
    borderRadius: 10,
  },
});

export default ToggleSwitch;
