import {Pressable, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IconButtonI {
  icon: string;
  size: number;
  color: string;
  onPress: () => void;
}

function IconButton({icon, size, color, onPress}: IconButtonI) {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <Ionicons name={icon} size={size} color={color}></Ionicons>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
export default IconButton;
