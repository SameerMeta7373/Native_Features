import {Text, View} from 'react-native';
import PlacesList from '../Components/Places/PlacesList';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {fetchPlaces} from '../Util/Database';

function AllPlacesScreen({route}) {
  const [loadedPlace, setLoadedPlace] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const place = await fetchPlaces();
      console.log('placessssssssssssss from db', place);

      setLoadedPlace(place);
    }
    if (isFocused) {
      loadPlaces();
      // setLoadedPlace(currPlaces => [...currPlaces, route.params.place]);
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlace} />;
}

export default AllPlacesScreen;
