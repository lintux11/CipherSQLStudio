require("dotenv").config();
const app = require("./src/app");
const connectMongoDB = require("./src/config/mongo");
const { testPostgresConnection } = require("./src/config/postgres");

const PORT = process.env.PORT || 5050;

const startServer = async () => {
  await connectMongoDB();
  await testPostgresConnection();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
