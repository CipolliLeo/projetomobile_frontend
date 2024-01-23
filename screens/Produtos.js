import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { Text } from "react-native-elements";
import { Card, Button } from "react-native-paper";
import produtoService from "../services/ProdutoService";
import styles from "../style/MainStyle";

export default function Produto() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    listProdutos();
  }, []);

  const editarProduto = (id) => {
    console.log(id);
  };

  const excluirProduto = (id) => {
    console.log(id);
    produtoService.deletarProduto(id).then((response) => listProdutos());
  };

  const confirmarExclusao = (id) => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir este serviço?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Confirmar",
        onPress: () => excluirProduto(id),
      },
    ]);
  };

  const listProdutos = () => {
    produtoService
      .listar()
      .then((response) => setProdutos(response.data))
      .catch((error) => console.log("Erro ao buscar usuários:", error));
  };

  return (
    <View style={{ flex: 1, justifyContent: "left", alignItems: "left" }}>
      <Text h3>Meus Produtos</Text>
      {produtos.map((produto) => (
        <View key={produto.id}>
          <Card style={styles.cardInfo}>
            <Card.Title title={produto.titulo} />
            <Card.Content>
              <Text h5>{produto.descricao}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                icon="pencil"
                mode="text"
                onPress={() => editarProduto(produto.id)}
              >
                Editar
              </Button>
              <Button
                icon="trash-can"
                mode="text"
                onPress={() => confirmarExclusao(produto.id)}
              >
                Excluir
              </Button>
            </Card.Actions>
          </Card>
          {/* <Text h3>{produto.titulo}</Text>
          <Text h5>{produto.descricao}</Text> */}
        </View>
      ))}
    </View>
  );
}
