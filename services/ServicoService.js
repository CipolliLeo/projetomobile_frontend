import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Config from "../util/Config";

class ServicoService {
  async cadastrar(data) {
    let token = await AsyncStorage.getItem("TOKEN");
    console.log(data);
    return axios({
      url: Config.API_URL + "servico/cadastrar",
      method: "POST",
      timeout: Config.TIMEOUT_REQUEST,
      data: data,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        print(response);
        return Promise.resolve(response);
      })
      .catch((error) => {
        print(response);
        return Promise.reject(error);
      });
  }

  async listar() {
    let token = await AsyncStorage.getItem("TOKEN");
    return axios({
      url: Config.API_URL + "servico/listar",
      method: "GET",
      timeout: Config.TIMEOUT_REQUEST,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        print(response);
        return Promise.resolve(response);
      })
      .catch((error) => {
        print(response);
        return Promise.reject(error);
      });
  }

  async deletarServico(id) {
    let token = await AsyncStorage.getItem("TOKEN");
    return axios({
      url: Config.API_URL + "servico/" + id,
      method: "DELETE",
      timeout: Config.TIMEOUT_REQUEST,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        print(response);
        return Promise.resolve(response);
      })
      .catch((error) => {
        print(response);
        return Promise.reject(error);
      });
  }
}

const servicoService = new ServicoService();
export default servicoService;
