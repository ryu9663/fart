import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playFartSound = async () => {
    try {
      // 이전 사운드가 있다면 정리
      if (sound) {
        await sound.unloadAsync();
      }

      setIsPlaying(true);

      // 방귀소리 로드 및 재생
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("./assets/sounds/fart.mp3")
      );

      setSound(newSound);

      // 재생 완료 시 상태 업데이트
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });

      await newSound.playAsync();
    } catch (error) {
      console.error("방귀소리 재생 중 오류 발생:", error);
      Alert.alert("오류", "방귀소리를 재생할 수 없습니다!");
      setIsPlaying(false);
    }
  };

  // 컴포넌트 언마운트 시 사운드 정리
  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>💨 방귀소리 앱 💨</Text>
        <Text style={styles.subtitle}>버튼을 눌러 방귀소리를 들어보세요!</Text>
      </View>

      {/* 방귀 아이콘 */}
      <View style={styles.iconContainer}>
        <Image
          source={require("./assets/images/fart-icon.png")}
          style={styles.fartIcon}
          resizeMode="contain"
        />
      </View>

      {/* 방귀소리 버튼 */}
      <TouchableOpacity
        style={[styles.fartButton, isPlaying && styles.fartButtonActive]}
        onPress={playFartSound}
        disabled={isPlaying}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {isPlaying ? "💨 재생 중... 💨" : "💨 방귀소리 재생 💨"}
        </Text>
      </TouchableOpacity>

      {/* 재미있는 메시지 */}
      <View style={styles.messageContainer}>
        <Text style={styles.funMessage}>
          {isPlaying ? "푸웅~! 🌪️" : "조용히... 버튼을 눌러보세요 🤫"}
        </Text>
      </View>

      {/* 하단 정보 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with 💨 and ❤️</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffd700",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    opacity: 0.8,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fartIcon: {
    width: 200,
    height: 200,
  },
  fartButton: {
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 50,
    marginVertical: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fartButtonActive: {
    backgroundColor: "#ff4757",
    transform: [{ scale: 0.95 }],
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  messageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  funMessage: {
    fontSize: 16,
    color: "#ffd700",
    textAlign: "center",
    fontStyle: "italic",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.6,
  },
});
