const mongoose = require("mongoose");

const { MONGO_URI } = require("./server-config");

const connectMongoDB = async () => {
  try {
    const res = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB has Connected");
  } catch (error) {
    console.log("Error has been occurred while connecting to DB:", error);
    process.exit();
  }
};

module.exports = {
  connectMongoDB,
};
