import {Pressable, StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Constants/Colors';

function OutlineButton({onPress, icon, children}) {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <Ionicons
        style={styles.icon}
        name={icon}
        size={20}
        color={Colors.primaryHeader}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primaryHeader,
    flexDirection: 'row',
  },
  pressed: {
    opacity: 0.75,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primaryHeader,
  },
});

export default OutlineButton;
