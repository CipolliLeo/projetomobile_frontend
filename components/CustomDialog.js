import * as React from "react";
import { View, Text } from "react-native";
import { Button, Dialog, Portal, PaperProvider } from "react-native-paper";

const CustomDialog = (props) => {
  return (
    <PaperProvider>
      <View>
        <Portal>
          <Dialog
            visible={props.visible}
            onDismiss={() => props.onClose(false)}
          >
            <Dialog.Title>{props.titulo}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{props.mensagem}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => props.onClose(false)}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default CustomDialog;
