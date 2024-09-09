import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllPlacesScreen from './Screens/AllPlacesScreen';
import AddPlaceScreen from './Screens/AddPlaceScreen';
import IconButton from './Components/UI/IconButton';
import Colors from './Components/Constants/Colors';
import MapScreen from './Screens/MapScreen';
import {useEffect, useState} from 'react';
import {initial} from './Util/Database';
import LoaderKit from 'react-native-loader-kit';
import {View} from 'react-native';
import PlaceDetailScreen from './Screens/PlaceDetailScreen';

const Stack = createNativeStackNavigator();

function App() {
  const [dbInitiliaze, setDbInitialize] = useState(false);

  useEffect(() => {
    initial()
      .then(() => {
        setDbInitialize(true);
      })
      .catch(error => {
        console.log('Failed to initialize Database ', error);
      });
  }, []);

  if (!dbInitiliaze) {
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
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#5e2121'},
            headerTintColor: Colors.primaryWhite,
            contentStyle: {backgroundColor: Colors.primaryBackground},
          }}>
          <Stack.Screen
            name="All Places"
            component={AllPlacesScreen}
            options={({navigation}) => ({
              title: 'Your Favourite Places',
              headerRight: ({tintColor}) => {
                return (
                  <IconButton
                    icon="add"
                    color={tintColor}
                    size={30}
                    onPress={() => navigation.navigate('AddPlaces')}
                  />
                );
              },
            })}
          />
          <Stack.Screen
            name="AddPlaces"
            component={AddPlaceScreen}
            options={{
              title: 'Add A New Place',
            }}
          />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen
            name="placeDetails"
            component={PlaceDetailScreen}
            options={{
              title: 'loading Place...',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
