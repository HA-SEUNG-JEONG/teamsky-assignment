import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchPress = () => {
    if (searchQuery.trim() === "") {
      Alert.alert("알림", "검색어를 입력해주세요.");
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ThemedView style={styles.container}>
        {/* 검색창 */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#999"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="궁금한 이론이 있다면 검색해보세요."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
              onSubmitEditing={handleSearchPress}
              accessibilityLabel="검색어 입력"
              accessibilityHint="검색하고 싶은 이론을 입력하세요"
            />
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
              accessibilityLabel="검색어 지우기"
              accessibilityRole="button"
            >
              <Image
                source={require("@/assets/icon/circle_x.png")}
                style={styles.clearIcon}
                tintColor="#999"
              />
            </TouchableOpacity>
          </View>

          {/* 검색 버튼 */}
          <TouchableOpacity
            style={[
              styles.searchButton,
              { opacity: searchQuery.trim() ? 1 : 0.43 }
            ]}
            onPress={handleSearchPress}
            disabled={!searchQuery.trim()}
            accessibilityLabel="검색하기"
            accessibilityHint="입력한 검색어로 검색을 실행합니다"
            accessibilityRole="button"
          >
            <ThemedText style={styles.searchButtonText}>검색하기</ThemedText>
          </TouchableOpacity>
        </View>

        {/* 하단 네비게이션 */}
        <View style={styles.bottomNavigation}>
          <TouchableOpacity
            style={styles.navItem}
            accessibilityLabel="학습"
            accessibilityRole="button"
          >
            <Image
              source={require("@/assets/icon/house-line.png")}
              style={styles.navIcon}
              tintColor="#2E57FF"
            />
            <ThemedText style={styles.navText}>학습</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            accessibilityLabel="나의 서재"
            accessibilityRole="button"
          >
            <Image
              source={require("@/assets/icon/user-alt-1.png")}
              style={styles.navIcon}
              tintColor="#999"
            />
            <ThemedText style={styles.navText}>나의 서재</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 50,
    paddingBottom: 10
  },
  statusText: {
    fontSize: 16,
    fontWeight: "500"
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  batteryText: {
    fontSize: 14
  },
  searchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "100%",
    marginBottom: 20
  },
  searchIcon: {
    marginRight: 12
  },
  clearButton: {
    padding: 4
  },
  clearIcon: {
    width: 20,
    height: 20
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingVertical: 8,
    height: 40,
    textAlignVertical: "center",
    textAlign: "left"
  },
  searchButton: {
    backgroundColor: "#2E57FF",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E7"
  },
  navItem: {
    alignItems: "center",
    gap: 4
  },
  navIcon: {
    width: 24,
    height: 24
  },
  navText: {
    fontSize: 12,
    color: "#999"
  }
});
