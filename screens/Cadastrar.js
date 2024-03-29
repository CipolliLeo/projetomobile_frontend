import * as React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../style/MainStyle";

export default function Cadastrar({ navigation }) {
  function cadastrarServico() {
    navigation.navigate("CadastrarServico");
  }

  function cadastrarProduto() {
    navigation.navigate("CadastrarProduto");
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>O que você quer cadastrar?</Text>
      <Button
        icon={<Icon name="child" size={15} color="white" />}
        title=" Cadastrar serviço"
        style={styles.button}
        onPress={() => cadastrarServico()}
      />
      <Button
        icon={<Icon name="shopping-bag" size={15} color="white" />}
        title=" Cadastrar produto"
        style={styles.button}
        onPress={() => cadastrarProduto()}
      />
    </View>
  );
}
