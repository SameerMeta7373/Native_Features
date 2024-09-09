import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import OutlineButton from '../Components/UI/OutlineButton';
import Colors from '../Components/Constants/Colors';
import React, {useEffect, useState} from 'react';
import LoaderKit from 'react-native-loader-kit';
import {fetchPlaceDetails, initial} from '../Util/Database';

function PlaceDetailScreen({route, navigation}) {
  const [fetchedPlace, setFetchedPlace] = useState();

  const selectedPlaceId = route.params.placeId;

  console.log('selectedPlaceId===>', selectedPlaceId);

  function showOnMapHandler() {
    if (fetchedPlace) {
      navigation.navigate('Map', {
        initialLat: fetchedPlace.location.lat,
        initialLong: fetchedPlace.location.long,
      });
    }
  }

  useEffect(() => {
    async function loadPlaceDetails() {
      try {
        const place = await fetchPlaceDetails(selectedPlaceId);
        setFetchedPlace(place);
        navigation.setOptions({
          title: place.title,
        });
      } catch (error) {
        console.error('Failed to load place Details');
      }
    }
    loadPlaceDetails();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <LoaderKit
          style={{
            width: 100,
            height: 100,
          }}
          name={'BallPulse'}
          color={'#8a1a1aff'}
        />
      </View>
    );
  }

  return (
    <ScrollView style={{padding: 25}}>
      <Image style={styles.image} source={{uri: fetchedPlace.imageUri}} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>
          View On Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    borderRadius: 16,
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PlaceDetailScreen;
