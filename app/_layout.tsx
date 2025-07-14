// index.tsx
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { Audio } from "expo-av";
import { useRef } from "react";

export default function HomeScreen() {
  const scale = useRef(new Animated.Value(1)).current;

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/fart.mp3"),
    );
    await sound.playAsync();

    // 버튼 애니메이션
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.3, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity onPress={playSound} style={styles.fartButton}>
          <Image
            source={require("../assets/images/fart-icon.png")}
            style={styles.fartImage}
          />
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.label}>방귀 뿡뿡 💨</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefae0",
  },
  fartButton: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#ffb703",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  fartImage: {
    width: 100,
    height: 100,
  },
  label: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#6a040f",
  },
});
