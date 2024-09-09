const GOOGLE_API_KEY = 'AIzaSyBn7ImIYdB5R1LV926HnZolwyxfd6datrM';

interface IMap {
  lat: number;
  long: number;
}

export function getMapPreview(lat: IMap, long: IMap) {
  const imagePreviewURl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${long}&key=${GOOGLE_API_KEY}`;
  console.log(imagePreviewURl);
  return imagePreviewURl;
}

export async function getAddress(lat, long) {
  const Url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}`;

  const response = await fetch(Url);
  if (!response.ok) {
    throw new Error('Failed to Get Address');
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  console.log('address==>', address);
  return address;
}
