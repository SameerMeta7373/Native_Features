import {useCallback, useLayoutEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Header} from 'react-native/Libraries/NewAppScreen';
import IconButton from '../Components/UI/IconButton';

function MapScreen({navigation, route}) {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    long: route.params.initialLong,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const initialRegion = {
    latitude: initialLocation ? initialLocation.lat : 24.858971,
    longitude: initialLocation ? initialLocation.long : 67.000853,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({lat: lat, long: long});
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No Location Picked!',
        'You have to pick location by tapping on the map first',
      );
      return;
    }
    navigation.navigate('AddPlaces', {
      pickedLat: selectedLocation.lat,
      pickedLong: selectedLocation.long,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <IconButton
          icon="bookmark"
          size={26}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.long,
          }}
        />
      )}
    </MapView>
  );
}
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
export default MapScreen;
