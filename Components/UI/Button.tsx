import {Pressable, StyleSheet, Text} from 'react-native';
import Colors from '../Constants/Colors';
import {ReactNode} from 'react';

interface Ibutton {
  onPress: () => void;
  children: ReactNode;
}

function Button({onPress, children}: Ibutton) {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: "16%",
    backgroundColor: Colors.primaryHeader,
    elevation: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.primaryWhite,
  },
});

export default Button;
