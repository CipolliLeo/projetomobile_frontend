import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { Text } from "react-native-elements";
import { Card, Button } from "react-native-paper";
import servicoService from "../services/ServicoService";
import styles from "../style/MainStyle";

export default function Servicos() {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    listServicos();
  }, []);

  const editarServico = (id) => {
    console.log(id);
  };

  const excluirServico = (id) => {
    console.log(id);
    servicoService.deletarServico(id).then((response) => listServicos());
  };

  const confirmarExclusao = (id) => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir este serviço?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Confirmar",
        onPress: () => excluirServico(id),
      },
    ]);
  };

  const listServicos = () => {
    servicoService
      .listar()
      .then((response) => setServicos(response.data))
      .catch((error) => console.log("Erro ao buscar usuários:", error));
  };

  return (
    <View style={{ flex: 1, justifyContent: "left", alignItems: "left" }}>
      <Text h3>Meus Serviços</Text>
      {servicos.map((servico) => (
        <View key={servico.id}>
          <Card style={styles.cardInfo}>
            <Card.Title title={servico.titulo} />
            <Card.Content>
              <Text h5>{servico.descricao}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                icon="pencil"
                mode="text"
                onPress={() => editarServico(servico.id)}
              >
                Editar
              </Button>
              <Button
                icon="trash-can"
                mode="text"
                onPress={() => confirmarExclusao(servico.id)}
              >
                Excluir
              </Button>
            </Card.Actions>
          </Card>
          {/* <Text h3>{servico.titulo}</Text>
          <Text h5>{servico.descricao}</Text> */}
        </View>
      ))}
    </View>
  );
}
