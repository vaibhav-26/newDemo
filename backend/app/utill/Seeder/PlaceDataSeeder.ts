import User from '../../Models/User';
import placedata from '../json/placedata.json';
import mongoose from 'mongoose';
import Location from '../../Models/Location';
import Floor from '../../Models/Floor';
import Wing from '../../Models/Wing';
import Desk from '../../Models/Desk';

mongoose.set('strictQuery', true);

mongoose.connect(`mongodb://localhost:27017/vdesk`);
const seedDB = async () => {
  placedata.location.map(async (location) => {
    const locationData = await Location.create({
      name: location.name,
    });

    location.floor.map(async (floor) => {
      const floorData = await Floor.create({
        name: floor.name,
        locationId: locationData._id,
      });

      floor.wings.map(async (wing) => {
        const wingData = await Wing.create({
          name: wing.name,
          floorId: floorData._id,
          locationId: locationData._id,
        });

        wing.desks.map(async (desk) => {
          const deskData = await Desk.create({
            name: desk.name,
            row: desk.row,
            floorId: floorData._id,
            locationId: locationData._id,
            wingId: wingData._id,
          });
        });
      });
    });
  });
};

seedDB().then((data) => {
  // mongoose.connection.close()
});
