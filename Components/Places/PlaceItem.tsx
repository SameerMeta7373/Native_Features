import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Colors from '../Constants/Colors';

function PlaceItem({place, onSelect}) {
  return (
    <Pressable
      style={({pressed}) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, place.id)}>
        
      <Image style={styles.image} source={{uri: place.imageUri}} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: '#9c7272',
    elevation: 4,
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    resizeMode:'cover',
    width:"30%",
    height : '100%',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    // height: 100,
  },
  info: {
    flex: 2,
    padding: 14,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.primaryWhite,
  },
  address: {
    fontSize: 14,
    color: Colors.primaryWhite,
  },
});

export default PlaceItem;
