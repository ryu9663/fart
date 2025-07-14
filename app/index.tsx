import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { Audio } from "expo-av";

export default function HomeScreen() {
  const playFartSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/fart.mp3"),
      { volume: 1.0 },
    );
    await sound.playAsync();
  };

  return (
    <View style={styles.container}>
      <Button title="방귀 뿡!" onPress={playFartSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
