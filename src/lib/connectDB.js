// lib/connectDB.js
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.jazz428.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (!process.env.MONGODB_USER || !process.env.MONGODB_PASS) {
  throw new Error("Missing MongoDB credentials in environment variables.");
}

// Reuse the client in development mode
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Always create a new client in production
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectDB() {
  const client = await clientPromise;
  return client.db("yawmly");
}

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.jazz428.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// let db;

// export async function connectDB() {
//   if (db) return db;
//   try {
//     const client = new MongoClient(uri, {
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//       },
//     });
//     db = client.db("yawmly");
//     return db;
//   } catch (error) {
//     return console.error(error);
//   }
// }
