import * as React from "react";
import { Alert, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {
  const logout = (navigation) => {
    AsyncStorage.removeItem("TOKEN")
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch(() => {
        Alert.alert("Erro ao sair");
      });
  };

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
      <Button
        icon={<Icon name="check" size={15} color="white" />}
        title=" Sair"
        onPress={() => logout(navigation)}
      />
    </View>
  );
}
