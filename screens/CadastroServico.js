import React, { useState } from "react";
import { Alert } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import servicoService from "../services/ServicoService";
import styles from "../style/MainStyle";
import DropDownPicker from "react-native-dropdown-picker";
export default function CadastrarServico() {
  const [titulo, setTitulo] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [valor, setValor] = useState(null);
  const [errorTitulo, setErrorTitulo] = useState(null);
  const [errorDescricao, setErrorDescricao] = useState(null);
  const [errorDropdown, setErrorDropdown] = useState(null);
  const [errorValor, setErrorValor] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [estado, setEstado] = useState(null);
  const [estados, setEstados] = useState([
    { label: "AC", value: "Acre" },
    { label: "AL", value: "Alagoas" },
    { label: "AP", value: "Amapá" },
    { label: "AM", value: "Amazonas" },
    { label: "BA", value: "Bahia" },
    { label: "CE", value: "Ceara" },
    { label: "DF", value: "Distrito Federal" },
    { label: "ES", value: "Espírito Santo" },
    { label: "GO", value: "Goiás" },
    { label: "MA", value: "Maranhão" },
    { label: "MT", value: "Mato Grosso" },
    { label: "MS", value: "Mato Grosso do Sul" },
    { label: "MG", value: "Minas Gerais" },
    { label: "PA", value: "Pará" },
    { label: "PB", value: "Paraíba" },
    { label: "PR", value: "Paraná" },
    { label: "PE", value: "Pernambuco" },
    { label: "PI", value: "Piauí" },
    { label: "RJ", value: "Rio de Janeiro" },
    { label: "RN", value: "Rio Grande do Norte" },
    { label: "RS", value: "Rio Grande do Sul" },
    { label: "RO", value: "Rondônia" },
    { label: "RR", value: "Roraima" },
    { label: "SC", value: "Santa Catarina" },
    { label: "SP", value: "São Paulo" },
    { label: "SE", value: "Sergipe" },
    { label: "TO", value: "Tocantins" },
  ]);

  const validar = () => {
    let error = false;
    setErrorTitulo(null);
    setErrorDescricao(null);
    setErrorDropdown(null);
    setErrorValor(null);

    if (titulo != null) {
      if (titulo.length < 5) {
        setErrorTitulo("Digite pelo menos 5 letras no título");
        error = true;
      }
    } else {
      setErrorTitulo("Digite pelo menos 5 letras no título");
      error = true;
    }

    if (descricao != null) {
      if (descricao.length < 20) {
        setErrorDescricao("Digite pelo menos 20 letras na descrição");
        error = true;
      }
    } else {
      setErrorDescricao("Digite pelo menos 20 letras na descrição");
      error = true;
    }
    console.log(estado);
    if (estado == null) {
      setErrorDropdown("Selecione o Estado de atuação");
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
        estado: estado,
      };
      console.log(data);
      servicoService
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
        <Text h3>Cadastrar Serviço</Text>

        <Input
          placeholder="Título do serviço"
          onChangeText={(value) => {
            setTitulo(value);
            setErrorTitulo(null);
          }}
          errorMessage={errorTitulo}
        />

        <Input
          placeholder="Descreva o serviço para explicar melhor"
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

        <DropDownPicker
          placeholder="Selecione o estado de atuação"
          open={open}
          value={estado}
          items={estados}
          setOpen={setOpen}
          setValue={setEstado}
          setItems={setEstados}
        />
        <Text style={styles.errorMessage}>{errorDropdown}</Text>

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
