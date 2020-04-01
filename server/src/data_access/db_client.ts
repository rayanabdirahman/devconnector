import mongoose from 'mongoose';
import logger from '../util/logger';

const DB_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mlab.com:51908/${process.env.DB_NAME}`;

const connectToDbClient = async (): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
  
      logger.info(`Successfully connected to database ✅`);
      resolve(`Successfully connected to database`);
  
    } catch(error) {
      logger.error(`Failed to connect to database 🛑 : ${error}`);
      reject(`Failed to connect to database: ${error}`);
    }
  })
};

export default connectToDbClient;
