import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';

type Props = {
  isVisible: boolean;
  bgColor?: ViewStyle['backgroundColor'];
  onClose: () => void;
};

const ModalView: React.FC<Props> = ({
  children,
  isVisible,
  bgColor,
  onClose,
}) => {
  const bgStyle = bgColor ? {backgroundColor: bgColor} : {};
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection={['down']}
      onSwipeComplete={onClose}
      useNativeDriverForBackdrop
      scrollOffsetMax={100} // content height - ScrollView height
      propagateSwipe>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, bgStyle]}>
          <ScrollView>
            <TouchableWithoutFeedback>
              <View>{children}</View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
        <View style={styles.drag} />
      </View>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  modal: {margin: 0},
  modalContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  modalContent: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingVertical: 20,
    maxHeight: 600,
  },
  drag: {
    backgroundColor: 'white',
    width: 58,
    height: 5,
    alignSelf: 'center',
    borderRadius: 16,
    marginBottom: 12,
  },
});
