import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();

  const handleSearchPress = () => {
    if (searchQuery.trim()) {
      // 검색 결과 화면으로 이동
      router.push({
        pathname: "/search-results",
        params: { query: searchQuery }
      });
    } else {
      Alert.alert("알림", "검색어를 입력해주세요.");
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <ThemedView style={styles.container}>
      {/* 상태바 영역 */}

      {/* 검색창 */}
      <View style={styles.searchContainer}>
        <View
          style={[styles.searchBar, isSearchFocused && styles.searchBarFocused]}
        >
          <Ionicons
            name="search"
            size={20}
            color="#007AFF"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="궁금한 이론이 있다면 검색해보세요."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            returnKeyType="search"
            onSubmitEditing={handleSearchPress}
          />
        </View>

        {/* 검색 버튼 */}
        <TouchableOpacity
          style={[
            styles.searchButton,
            { opacity: searchQuery.trim() ? 1 : 0.43 }
          ]}
          onPress={handleSearchPress}
          disabled={!searchQuery.trim()}
        >
          <ThemedText style={styles.searchButtonText}>검색하기</ThemedText>
        </TouchableOpacity>
      </View>

      {/* 하단 네비게이션 */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#007AFF" />
          <ThemedText style={styles.navText}>학습</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#999" />
          <ThemedText style={styles.navText}>나의 서재</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
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
    paddingHorizontal: 20,
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E5E5E7",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
    marginBottom: 20
  },
  searchBarFocused: {
    borderColor: "#007AFF"
  },
  searchIcon: {
    marginRight: 12
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000"
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
  navText: {
    fontSize: 12,
    color: "#999"
  }
});
