import AddPlaceForm from '../Components/Places/AddPlaceForm';
import {insertPlace} from '../Util/Database';

function AddPlaceScreen({navigation}) {
  async function createPlaceHandler(place) {
    try {
      await insertPlace(place);
      navigation.goBack();
    } catch (e) {
      console.log('Error', e);
    }
  }

  return <AddPlaceForm onAddPlace={createPlaceHandler} />;
}

export default AddPlaceScreen;
