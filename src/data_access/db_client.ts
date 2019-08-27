import mongoose from 'mongoose';
import { MongoCallback, MongoClient } from 'mongodb';

const MONGO_URI: string = `${process.env.MONGO_URI}`

const getMongoDbClient = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true });
    console.log('Successfully connected to DbClient');
  }
  catch(error) {
    console.error(`Failed to connect to DbClient: ${error.message}`);
    process.exit(1);
  }
}

export {getMongoDbClient}