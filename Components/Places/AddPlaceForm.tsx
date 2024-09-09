import {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Colors from '../Constants/Colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';
import {Place} from '../../Models/Place';

interface IAddPlaceForm {
  onAddPlace: () => void;
}

function AddPlaceForm({onAddPlace}) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setselectedImage] = useState();

  function savePlaceHandler() {
    const placeData = new Place(
      enteredTitle,
      selectedImage,
      pickedLocation,
      Math.random(),
    );
    onAddPlace(placeData);
  }

  function ImageTakeHandler(enteredText) {
    setselectedImage(enteredText);
  }

  const PickLocationHandler = useCallback(location => {
    setPickedLocation(location);
  }, []);

  function TitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={TitleHandler}
          value={enteredTitle}
          placeholder="Enter Title Here"></TextInput>
      </View>
      <ImagePicker onTakeImage={ImageTakeHandler} />
      <LocationPicker onPickLocation={PickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
    color: Colors.primaryHeader,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 18,
    borderBottomColor: Colors.primaryHeader,
    borderBottomWidth: 2,
    backgroundColor: Colors.inputBackground,
  },
});

export default AddPlaceForm;
