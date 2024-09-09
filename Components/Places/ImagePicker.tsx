import {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Colors from '../Constants/Colors';
import OutlineButton from '../UI/OutlineButton';

function useCameraPermission() {
  const [permissionStatus, setPermissionStatus] = useState<string>(
    RESULTS.UNAVAILABLE,
  );

  const checkCamPermission = async () => {
    const permission = Platform.select({
      android: PERMISSIONS.ANDROID.CAMERA,
    });

    if (!permission) {
      setPermissionStatus(RESULTS.UNAVAILABLE);
      return;
    }

    const requestResult = await request(permission);
    const result = await check(permission);
    setPermissionStatus(result);

    if (result === RESULTS.DENIED) {
      setPermissionStatus(requestResult);
    } else if (requestResult === RESULTS.BLOCKED) {
      Alert.alert(
        'Permission Blocked!',
        'Go in to the app settings to unblock Permissions',
      );
    }
  };
  useEffect(() => {
    checkCamPermission();
  }, []);
  return {permissionStatus, checkCamPermission};
}

function ImagePicker({onTakeImage}) {
  const [pickedImage, setPickedImage] = useState();
  const {checkCamPermission, permissionStatus} = useCameraPermission();

  const TakeImageHandler = async () => {
    if (permissionStatus !== RESULTS.GRANTED) {
      Alert.alert(
        'Permission Required',
        'Camera access is required to take pictures. Please grant camera permission in your settings.',
        [{text: 'OK'}, {text: 'Ask Permission', onPress: checkCamPermission}],
      );
      return;
    } else {
      const image = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
      });

      const pickedImageUri = image.assets[0].uri;
      setPickedImage(pickedImageUri);
      onTakeImage(pickedImageUri);
    }
  };

  let imagePreview = <Text>No Image Taken Yet</Text>;
  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{uri: pickedImage}} />;
  }

  return (
    <View>
      <View>
        <View style={styles.imagePreview}>{imagePreview}</View>
        <OutlineButton icon="camera" onPress={TakeImageHandler}>
          Take an Image
        </OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
export default ImagePicker;
