import mongoose from 'mongoose'

const connectDB = () => {
  const MONGODB_URI = process.env.MONGODB_URI
  console.log('connecting to ', MONGODB_URI)

  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('connected to MongoDb'))
    .catch((error) => console.log('error connection to MongoDB:', error))
}

export default connectDB
