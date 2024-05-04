import styles from './styles';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import Text from '@components/text.component';

interface OverlayCustomProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  footerChildren?: any;
  title?: string;
  description?: string;
  isClickBackdropHide?: boolean;
  children?: any;
  width?: string;
  styleContainer?: any;
  customStyleOverlay?: any;
  customStyleFooter?: any;
  iconClose?: any;
}
const OverlayCustom = ({
  modalVisible,
  setModalVisible,
  footerChildren,
  title,
  description,
  isClickBackdropHide = true,
  children = null,
  width = '90%',
  styleContainer = {},
  customStyleOverlay = {},
  customStyleFooter = {},
  iconClose = null,
}: OverlayCustomProps) => {
  return (
    <Overlay
      isVisible={modalVisible}
      width={width}
      height="auto"
      onBackdropPress={() => (isClickBackdropHide ? setModalVisible(false) : false)}
      overlayStyle={[styles.overlayStyle, customStyleOverlay]}
    >
      <ScrollView>
        <View style={[styles.centeredView, styleContainer]}>
          <View>
            {title ? <Text style={styles.modalTitle}>{title}</Text> : null}
            {description ? <Text style={styles.modalDes}>{description}</Text> : null}
            {children}
          </View>
          {footerChildren && <View style={[styles.modalFooter, customStyleFooter]}>{footerChildren()}</View>}
        </View>
      </ScrollView>
    </Overlay>
  );
};

export default OverlayCustom;
