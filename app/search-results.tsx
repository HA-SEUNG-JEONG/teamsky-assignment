import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function SearchResultsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.query) {
      setSearchQuery(params.query as string);
    }
  }, [params.query]);

  const handleSearchPress = () => {
    if (searchQuery.trim()) {
      // 새로운 검색 수행
      router.replace({
        pathname: "/search-results",
        params: { query: searchQuery }
      });
    }
  };

  const handleClosePress = () => {
    router.back();
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  // 모의 검색 결과 데이터
  const mockResults = [
    {
      id: 1,
      title: "OPENRUN",
      subtitle: "온라인에서 가장 빠르게 만나는 신상",
      description:
        "새로운 제품을 가장 빠르게 만날 수 있는 온라인 플랫폼입니다.",
      category: "쇼핑"
    },
    {
      id: 2,
      title: "검색 결과 2",
      subtitle: "관련된 내용",
      description: "검색어와 관련된 추가 정보입니다.",
      category: "일반"
    },
    {
      id: 3,
      title: "검색 결과 3",
      subtitle: "더 많은 정보",
      description: "다른 관련 검색 결과입니다.",
      category: "정보"
    }
  ];

  return (
    <ThemedView style={styles.container}>
      {/* 상태바 영역 */}

      {/* X 버튼 */}
      <TouchableOpacity style={styles.closeButton} onPress={handleClosePress}>
        <Ionicons name="close" size={24} color="#000" />
      </TouchableOpacity>

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
            autoFocus
          />
        </View>
      </View>

      {/* 검색 결과 */}
      <ScrollView
        style={styles.resultsContainer}
        showsVerticalScrollIndicator={false}
      >
        {mockResults.map((result) => (
          <TouchableOpacity key={result.id} style={styles.resultItem}>
            <View style={styles.resultContent}>
              <ThemedText style={styles.resultTitle}>{result.title}</ThemedText>
              <ThemedText style={styles.resultSubtitle}>
                {result.subtitle}
              </ThemedText>
              <ThemedText style={styles.resultDescription}>
                {result.description}
              </ThemedText>
              <View style={styles.resultCategory}>
                <ThemedText style={styles.categoryText}>
                  {result.category}
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20
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
    width: "100%"
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
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  resultItem: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e9ecef"
  },
  resultContent: {
    gap: 8
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007AFF"
  },
  resultSubtitle: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500"
  },
  resultDescription: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20
  },
  resultCategory: {
    alignSelf: "flex-start",
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4
  },
  categoryText: {
    fontSize: 12,
    color: "#1976d2",
    fontWeight: "500"
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
