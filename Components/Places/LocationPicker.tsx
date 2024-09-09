import {Alert, Image, Platform, StyleSheet, Text, View} from 'react-native';
import OutlineButton from '../UI/OutlineButton';
import Colors from '../Constants/Colors';
import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {RESULTS, PERMISSIONS, request, check} from 'react-native-permissions';
import {getAddress} from '../../Util/Location';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';

function UseLocationPermission() {
  const [locationPermission, setLocationPermission] = useState<string>(
    RESULTS.UNAVAILABLE,
  );

  async function verifyPermission() {
    console.log('permission ===>', RESULTS.UNAVAILABLE);

    const permission = Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });
    if (!permission) {
      setLocationPermission(RESULTS.UNAVAILABLE);
      return;
    }

    const requestResult = await request(permission);
    const result = await check(permission);
    console.log('result==>', result);

    setLocationPermission(result);

    if (result === RESULTS.DENIED || result === RESULTS.UNAVAILABLE) {
      setLocationPermission(requestResult);
    }
    if (requestResult === RESULTS.BLOCKED || result === RESULTS.UNAVAILABLE) {
      Alert.alert(
        'Permission Blocked!',
        'Go in to the app settings to unblock Permissions',
      );
    }
  }

  useEffect(() => {
    verifyPermission();
  }, []);
  return {locationPermission, verifyPermission};
}

function LocationPicker({onPickLocation}) {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const {locationPermission, verifyPermission} = UseLocationPermission();
  const [pickedLocation, setPickedLocation] = useState<{
    lat;
    long;
  }>();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.pickedLat,
        long: route.params.pickedLong,
      };

      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.long,
        );
        console.log('address==>', address);

        onPickLocation({...pickedLocation, address: address});
      }
    }
    handleLocation();
  }, [pickedLocation, onPickLocation]);

  const LocationHandler = async () => {
    if (locationPermission !== RESULTS.GRANTED) {
      Alert.alert(
        'Permission Required',
        'Location access is required to get your current Location. Please grant Location permission in your settings.',
        [{text: 'OK'}, {text: 'Ask Permission', onPress: verifyPermission}],
      );
    }

    Geolocation.getCurrentPosition(
      currPosition => {
        const {latitude, longitude} = currPosition.coords;
        setPickedLocation({
          lat: latitude,
          long: longitude,
        });
      },
      error => {
        console.log('Failed to get Location', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  function PickMapHandler() {
    navigation.navigate('Map');
  }
  let locationPreview = <Text>No Location added Yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <MapView
        style={styles.mapPreviewImage}
        initialRegion={{
          latitude: pickedLocation.lat,
          longitude: pickedLocation.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {pickedLocation && (
          <Marker
            title="Picked Location"
            coordinate={{
              latitude: pickedLocation.lat,
              longitude: pickedLocation.long,
            }}
          />
        )}
      </MapView>
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={LocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={PickMapHandler}>
          Pick On Map
        </OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mapPreviewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default LocationPicker;
