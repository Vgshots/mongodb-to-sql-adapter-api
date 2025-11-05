export class D1Adapter {
  constructor(client) {
    this.client = client;
  }

  async find(collection, filter) {
    const query = `SELECT * FROM ${collection} WHERE ${this.buildWhereClause(filter)}`;
    const values = this.extractValues(filter);
    const result = await this.client
      .prepare(query)
      .bind(...values)
      .all();
    return result.results;
  }

  async findOne(collection, filter) {
    const query = `SELECT * FROM ${collection} WHERE ${this.buildWhereClause(filter)} LIMIT 1`;
    const values = this.extractValues(filter);
    const result = await this.client
      .prepare(query)
      .bind(...values)
      .first();
    return result || null;
  }

  async insertOne(collection, document) {
    const columns = Object.keys(document).join(", ");
    const values = this.extractValues(document);
    const placeholders = values.map((_, i) => `?${i + 1}`).join(", ");
    const query = `INSERT INTO ${collection} (${columns}) VALUES (${placeholders}) RETURNING *`;
    const result = await this.client
      .prepare(query)
      .bind(...values)
      .run();
    return result.results[0];
  }

  async insertMany(collection, documents) {
    const columns = Object.keys(documents[0]).join(", ");
    const values = documents.flatMap((doc) => this.extractValues(doc));
    const placeholders = documents
      .map(
        (_, i) =>
          `(${Object.keys(documents[i])
            .map((_, j) => `?${i * Object.keys(documents[i]).length + j + 1}`)
            .join(", ")})`
      )
      .join(", ");
    const query = `INSERT INTO ${collection} (${columns}) VALUES ${placeholders} RETURNING *`;
    const result = await this.client
      .prepare(query)
      .bind(...values)
      .run();
    return result.results;
  }

  async updateOne(collection, filter, update) {
    const setClause = this.buildSetClause(update);
    const whereClause = this.buildWhereClause(filter);
    const values = [...this.extractValues(update), ...this.extractValues(filter)];
    const query = `UPDATE ${collection} SET ${setClause} WHERE ${whereClause} RETURNING *`;
    const result = await this.client
      .prepare(query)
      .bind(...values)
      .run();
    return result.results[0];
  }

  async updateMany(collection, filter, update) {
    const setClause = this.buildSetClause(update);
    const whereClause = this.buildWhereClause(filter);
    const values = [...this.extractValues(update), ...this.extractValues(filter)];
    const query = `UPDATE ${collection} SET ${setClause} WHERE ${whereClause} RETURNING *`;
    const result = await this.client
      .prepare(query)
      .bind(...values)
      .run();
    return result.results;
  }

  async deleteOne(collection, filter) {
    const whereClause = this.buildWhereClause(filter);
    const values = this.extractValues(filter);
    const query = `DELETE FROM ${collection} WHERE ${whereClause} RETURNING *`;
    const result = await this.client
      .prepare(query)
      .bind(...values)
      .run();
    return result.results[0];
  }

  async deleteMany(collection, filter) {
    const whereClause = this.buildWhereClause(filter);
    const values = this.extractValues(filter);
    const query = `DELETE FROM ${collection} WHERE ${whereClause} RETURNING *`;
    const result = await this.client
      .prepare(query)
      .bind(...values)
      .run();
    return result.results;
  }

  async aggregate(collection, pipeline) {
    let query = `SELECT * FROM ${collection}`;

    pipeline.forEach((stage) => {
      if (stage.$match) {
        query += ` WHERE ${this.buildWhereClause(stage.$match)}`;
      }
      if (stage.$group) {
        const groupBy = Object.keys(stage.$group).join(", ");
        query += ` GROUP BY ${groupBy}`;
      }
    });

    const result = await this.client.prepare(query).all();
    return result.results;
  }

  buildWhereClause(filter) {
    return Object.keys(filter)
      .map((key, i) => `${key} = ?${i + 1}`)
      .join(" AND ");
  }

  buildSetClause(update) {
    return Object.keys(update)
      .map((key, i) => `${key} = ?${i + 1}`)
      .join(", ");
  }

  extractValues(obj) {
    return Object.values(obj);
  }
}
