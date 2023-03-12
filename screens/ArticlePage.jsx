import { useEffect, useState } from "react";
import { View } from "react-native";
import styled from "styled-components";
import axios from "axios";
import { Loading } from "../components/Loading";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

export const ArticlePage = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { id, title } = route.params;

  useEffect(() => {
    setIsLoading(true);
    navigation.setOptions({ title });
    axios
      .get("https://63b07a40f9a53fa2026a1adb.mockapi.io/articles/" + id)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const { imageUrl, text } = data;
  return (
    <View style={{ padding: 20 }}>
      <PostImage source={{ uri: imageUrl }} />
      <PostText>{text}</PostText>
    </View>
  );
};
