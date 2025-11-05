import { D1Adapter } from "./d1Adapter";

class DatabaseService {
  constructor(config, client) {
    if (config.database.type === "d1") {
      this.adapter = new D1Adapter(client);
    } else {
      throw new Error("Unsupported database type");
    }
  }

  // Find documents
  async find(collection, filter) {
    return this.adapter.find(collection, filter);
  }

  async findOne(collection, filter) {
    return this.adapter.findOne(collection, filter);
  }

  async insertOne(collection, document) {
    return this.adapter.insertOne(collection, document);
  }

  async insertMany(collection, documents) {
    return this.adapter.insertMany(collection, documents);
  }

  async updateOne(collection, filter, update) {
    return this.adapter.updateOne(collection, filter, update);
  }

  async updateMany(collection, filter, update) {
    return this.adapter.updateMany(collection, filter, update);
  }

  async deleteOne(collection, filter) {
    return this.adapter.deleteOne(collection, filter);
  }

  async deleteMany(collection, filter) {
    return this.adapter.deleteMany(collection, filter);
  }

  async aggregate(collection, pipeline) {
    return this.adapter.aggregate(collection, pipeline);
  }
}

export default DatabaseService;
