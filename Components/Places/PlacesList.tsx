import {FlatList, StyleSheet, Text, View} from 'react-native';
import PlaceItem from './PlaceItem';
import Colors from '../Constants/Colors';
import { useNavigation } from '@react-navigation/native';

function PlacesList({places}) {

  const navigation = useNavigation()

  function selectPlaceHandler(id){
    navigation.navigate('placeDetails',{
      placeId : id
    })
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallbackText}>No Places Found Start Adding!</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      renderItem={({item}) => <PlaceItem place={item} onSelect={selectPlaceHandler} />}
      keyExtractor={item => item.id}
    />
  );
}
const styles = StyleSheet.create({
  list: {
    margin: 14,
  },
  fallBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 18,
    color: Colors.primaryBlack,
  },
});

export default PlacesList;
