import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from './styles';

function ModalCustom(props: { modalVisible: any; children: any; setModalVisible: any }) {
  const { modalVisible, children, setModalVisible } = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      {/* <View style={styles.centeredView}>
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={styles.txtClose}>Close</Text>
        </TouchableOpacity> */}
      {/* <View style={styles.modalView}>{children}</View> */}
      {/* </View> */}
      {children}
    </Modal>
  );
}

export default ModalCustom;
