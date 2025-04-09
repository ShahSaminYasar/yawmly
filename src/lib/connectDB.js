const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.jazz428.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let db;

export async function connectDB() {
  if (db) return db;
  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    db = client.db("yawmly");
    return db;
  } catch (error) {
    return console.error(error);
  }
}
