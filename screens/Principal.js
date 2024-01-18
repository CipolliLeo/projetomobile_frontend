import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Perfil from "./Perfil";
import Busca from "./Busca";
import Produtos from "./Produtos";
import Servicos from "./Servicos";
import Cadastrar from "./Cadastrar";

const Tab = createMaterialBottomTabNavigator();

export default function Principal() {
  return (
    <Tab.Navigator
      initialRouteName="Busca"
      activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: "tomato" }}
    >
      <Tab.Screen
        name="Busca"
        component={Busca}
        options={{
          tabBarLabel: "Buscar",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Produtos"
        component={Produtos}
        options={{
          tabBarLabel: "Produtos",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="shopping-bag" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cadastrar"
        component={Cadastrar}
        options={{
          tabBarLabel: "Cadastrar",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Serviços"
        component={Servicos}
        options={{
          tabBarLabel: "Serviços",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tools" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
