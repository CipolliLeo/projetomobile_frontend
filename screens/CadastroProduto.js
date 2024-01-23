import React, { useState } from "react";
import { Alert } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../style/MainStyle";
import produtoService from "../services/ProdutoService";

export default function CadastrarProduto() {
  const [titulo, setTitulo] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [valor, setValor] = useState(null);
  const [errorTitulo, setErrorTitulo] = useState(null);
  const [errorDescricao, setErrorDescricao] = useState(null);
  const [errorValor, setErrorValor] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const validar = () => {
    let error = false;
    setErrorTitulo(null);
    setErrorDescricao(null);
    setErrorValor(null);

    if (titulo.length < 5) {
      setErrorTitulo("Digite pelo menos 5 letras no título");
      error = true;
    }
    if (descricao.length < 20) {
      setErrorDescricao("Digite pelo menos 20 letras na descrição");
      error = true;
    }
    if (!valor) {
      setErrorValor("Digite um valor");
    }

    return !error;
  };

  const salvar = () => {
    if (validar()) {
      setLoading(true);

      let data = {
        titulo: titulo,
        descricao: descricao,
        valor: valor,
      };
      produtoService
        .cadastrar(data)
        .then((response) => {
          setLoading(false);
          Alert.alert(response.data.mensagem);
          setTitulo(null);
          setDescricao(null);
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert("Erro", "Houve um erro inesperado");
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[styles.container]}
      keyboardVerticalOffset={80}
    >
      <ScrollView style={{ width: "100%" }}>
        <Text h3>Cadastrar Produto</Text>

        <Input
          placeholder="Título do Produto"
          onChangeText={(value) => {
            setTitulo(value);
            setErrorTitulo(null);
          }}
          errorMessage={errorTitulo}
        />

        <Input
          placeholder="Descreva o produto para explicar melhor"
          onChangeText={(value) => {
            setDescricao(value);
            setErrorDescricao(null);
          }}
          errorMessage={errorDescricao}
        />

        <Input
          placeholder="Valor do produto"
          onChangeText={(value) => setValor(value)}
          errorMessage={errorValor}
          keyboardType="number-pad"
        />

        {isLoading && <Text>Carregando...</Text>}

        {!isLoading && (
          <>
            <Button
              icon={<Icon name="check" size={15} color="white" />}
              title="Salvar"
              buttonStyle={styles.button}
              onPress={() => salvar()}
            />

            <Button
              icon={<Icon name="remove" size={15} color="white" />}
              title="Cancelar"
              buttonStyle={[styles.button, styles.cancelButton]}
              onPress={() => cancelar()}
            />
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
