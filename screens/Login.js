import { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../style/MainStyle";
import usuarioService from "../services/UsuarioService";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingToken, setLoadingToken] = useState(true);

  const entrar = () => {
    let data = {
      username: email,
      password: password,
    };

    usuarioService
      .login(data)
      .then((response) => {
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "Principal" }],
        });
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Usuário não existe");
      });
  };

  const logarComToken = (token) => {
    setLoadingToken(true);
    let data = {
      token: token,
    };

    usuarioService
      .loginComToken(data)
      .then((response) => {
        setLoadingToken(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "Principal" }],
        });
      })
      .catch((error) => {
        setLoadingToken(false);
      });
  };

  const cadastrar = () => {
    navigation.navigate("Cadastro");
  };

  useEffect(() => {
    AsyncStorage.getItem("TOKEN").then((token) => {
      if (token) {
        logarComToken(token);
      } else {
        setLoadingToken(false);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {isLoadingToken && <Text>Só um minutinho...</Text>}

      {!isLoadingToken && (
        <>
          <Text h3>Entre no TemTudoAki</Text>
          <Input
            placeholder="E-mail"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(value) => setEmail(value)}
            keyboardType="email-address"
          />
          <Input
            placeholder="Sua Senha"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry={true}
          />

          {isLoading && <ActivityIndicator />}

          {!isLoading && (
            <Button
              icon={<Icon name="check" size={15} color="white" />}
              title=" Entrar"
              buttonStyle={specificStyle.button}
              onPress={() => entrar()}
            />
          )}
          <Button
            icon={<Icon name="user" size={15} color="white" />}
            title=" Cadastrar"
            buttonStyle={specificStyle.button}
            onPress={() => cadastrar()}
          />
        </>
      )}
    </View>
  );
}

const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    marginTop: 10,
  },
});
