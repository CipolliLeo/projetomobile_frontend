import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, CheckBox, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../style/MainStyle";
import { TextInputMask } from "react-native-masked-text";
import usuarioService from "../services/UsuarioService";
import { ScrollView } from "react-native-gesture-handler";
import CustomDialog from "../components/CustomDialog";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState(null);
  const [nome, setNome] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [senha, setSenha] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [isSelected, setSelected] = useState(false);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorNome, setErrorNome] = useState(null);
  const [errorCpf, setErrorCpf] = useState(null);
  const [errorSenha, setErrorSenha] = useState(null);
  const [errorTelefone, setErrorTelefone] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // Necessário para Custom Dialog
  // const [visibleDialog, setVisibleDialog] = useState(null)
  // const [titulo, setTitulo] = useState(null)
  // const [mensagem, setMensagem] = useState(null)
  // const [tipo, setTipo] = useState(null)
  // const showDialog = () => {
  //   setVisibleDialog(true)
  //   setTitulo(titulo)
  //   setMensagem(mensagem)
  //   setTipo(tipo)
  // }
  // const hideDialog = (status) => {
  //   setVisibleDialog(status);
  // };

  let cpfField = null;
  let telefoneField = null;

  // const teste = () => {
  //   console.log("Este console está na tela de Cadastro");
  // };

  const validar = () => {
    let error = false;
    setErrorEmail(null);
    setErrorCpf(null);
    setErrorSenha(null);
    setErrorTelefone(null);

    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      setErrorEmail("Preencha seu e-mail corretamente");
      error = true;
    }
    if (!cpfField.isValid()) {
      setErrorCpf("Preencha seu CPF corretamente");
      error = true;
    }
    if (telefone == null) {
      setErrorTelefone("Preencha seu telefone corretamente");
      error = true;
    }
    if (senha == null) {
      setErrorSenha("Preencha a senha");
      error = true;
    }

    return !error;
  };

  const salvar = () => {
    if (validar()) {
      setLoading(true);

      let data = {
        email: email,
        cpf: cpf,
        nome: nome,
        telefone: telefone,
        senha: senha,
      };

      usuarioService
        .cadastrar(data)
        .then((response) => {
          setLoading(false);
          const titulo = response.data.status ? "Sucesso" : "Erro";
          Alert.alert(titulo, response.data.mensagem);
          // showDialog (titulo, response.data.mensagem, "SUCESSO") Uso para Custom Dialog
          console.log(response.data);
        })
        .catch((error) => {
          setLoading(false);
          // showDialog ("Erro", "Houve um erro inesperado", "ERRO") Uso para Custom Dialog
          Alert.alert("Erro", "Houve um erro inesperado");
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[styles.container, specificStyle.specificContainer]}
      keyboardVerticalOffset={80}
    >
      <ScrollView style={{ width: "100%" }}>
        <Text h3>Cadastre-se</Text>
        <Input
          placeholder="E-mail"
          onChangeText={(value) => {
            setEmail(value);
            setErrorEmail(null);
          }}
          keyboardType="email-address"
          errorMessage={errorEmail}
        />

        <Input
          placeholder="Nome"
          onChangeText={(value) => setNome(value)}
          errorMessage={errorNome}
        />

        <View style={styles.containerMask}>
          <TextInputMask
            placeholder="CPF"
            type={"cpf"}
            value={cpf}
            onChangeText={(value) => {
              setCpf(value);
              setErrorCpf(null);
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            errorMessage={errorCpf}
            style={styles.maskedInput}
            ref={(ref) => (cpfField = ref)}
          />
        </View>
        <Text style={styles.errorMessage}>{errorCpf}</Text>

        <View style={styles.containerMask}>
          <TextInputMask
            placeholder="Telefone"
            type={"cel-phone"}
            options={{
              maskType: "BRL",
              withDDD: true,
              dddMask: "(99) ",
            }}
            value={telefone}
            onChangeText={(value) => setTelefone(value)}
            keyboardType="phone-pad"
            returnKeyType="done"
            errorMessage={errorTelefone}
            style={styles.maskedInput}
            ref={(ref) => (telefoneField = ref)}
          />
        </View>
        <Text style={styles.errorMessage}>{errorTelefone}</Text>

        <Input
          placeholder="Senha"
          onChangeText={(value) => setSenha(value)}
          errorMessage={errorNome}
          secureTextEntry={true}
        />

        <CheckBox
          title="Eu aceito os termos de uso"
          checkedIcon="check"
          uncheckedIcon="square-o"
          checkedColor="green"
          uncheckedColor="red"
          checked={isSelected}
          onPress={() => setSelected(!isSelected)}
        />

        {isLoading && <Text>Carregando...</Text>}

        {!isLoading && (
          <Button
            icon={<Icon name="check" size={15} color="white" />}
            title=" Salvar"
            buttonStyle={specificStyle.button}
            onPress={() => salvar()}
          />
        )}
        {/* {visibleDialog && (
          <CustomDialog
            titulo={titulo}
            mensagem={mensagem}
            tipo={tipo}
            visible={visibleDialog}
            onClose={hideDialog()}
          ></CustomDialog>
        )} */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: "#fff",
    padding: 10,
  },
  button: {
    width: "100%",
    marginTop: 10,
  },
});
