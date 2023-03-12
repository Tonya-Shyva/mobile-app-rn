import {
  Alert,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import axios from "axios";
// import styled from "styled-components";
import { Post } from "../components/Post";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState();

  const getPosts = () => {
    setIsLoading(true);
    axios
      .get("https://63b07a40f9a53fa2026a1adb.mockapi.io/articles")
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Mistake", "Not found");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(getPosts, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getPosts} />
        }
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Article", {
                id: item.id,
                title: item.title,
              })
            }
          >
            <Post
              title={item.title}
              imageUrl={item.imageUrl}
              createdAt={item.createdAt}
            />
          </TouchableOpacity>
        )}
      />
      <StatusBar theme="auto" />
    </View>
  );
};
