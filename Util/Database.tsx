import {enablePromise, openDatabase} from 'react-native-sqlite-storage';
import {Place} from '../Models/Place';

enablePromise(true);

const connectDB = async () => {
  return openDatabase(
    {name: 'places.db'},
    () => {
      console.log('Connection success!');
    },
    error => {
      console.log('Error Connecting DB', error);
    },
  );
};

export async function initial() {
  try {
    await connectDB().then(database => {
      database.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS places (
                      id INTEGER PRIMRARY KEY NOT NULL,
                      title  TEXT NOT NULL,
                      imageUri TEXT NOT NULL,
                      address TEXT NOT NULL,
                      lat REAL NOT NULL,
                      long REAL NOT NULL
                      )`,
        );
      });
    });
    console.log('Database initialized successfully');
  } catch (error) {
    console.log('Failed to initialize Database', error);
  }
}

export async function insertPlace(place) {
  return new Promise(async (resolve, reject) => {
    try {
      await connectDB().then(res => {
        res.transaction(function (txn) {
          txn.executeSql(
            `INSERT INTO places (id, title, imageUri, address, lat, long) VALUES (?, ?, ?, ?, ?, ?);`,
            [
              place.id,
              place.title,
              place.imageUri,
              place.address,
              place.location.lat,
              place.location.long,
            ],
            function (tx, res) {
              console.log('SQLITE INSERT RESULT:', res);
              resolve(res);
            },
            function (error) {
              console.log('Failed to insert:', error);
              reject();
            },
          );
        });
      });
    } catch (error) {
      console.log('error', error);
    }
  });
}

export async function fetchPlaces() {
  return new Promise(async (resolve, reject) => {
    await connectDB().then(res => {
      res.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM places ',
          [],
          (_, result) => {
            let places = [];

            for (let i = 0; i < result.rows.length; i++) {
              const dp = result.rows.item(i);

              let p = new Place(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  long: dp.long,
                },
                dp.id,
              );

              places.push(p);
            }
            resolve(places);
          },
          (_, error) => {
            reject(error);
            return false;
          },
        );
      });
    });
  });
}

export async function fetchPlaceDetails(id) {
  try {
    return new Promise(async (resolve, reject) => {
      await connectDB().then(database => {
        database.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM places WHERE id = ?',
            [id],
            (_, result) => {
              if (result.rows.length > 0) {
                const dbPlace = result.rows.item(0);

                const place = new Place(
                  dbPlace.title,
                  dbPlace.imageUri,
                  {
                    address: dbPlace.address,
                    lat: dbPlace.lat,
                    long: dbPlace.long,
                  },

                  dbPlace.id,
                );
                resolve(place);
              } else {
                resolve(null);
              }
            },
            (_, error) => {
              reject(error);
            },
          );
        });
      });
    });
  } catch (error) {
    console.error('Error Fetching Data');
  }
}
