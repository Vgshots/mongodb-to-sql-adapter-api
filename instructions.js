export const instructions = `

# MongoDB-to-SQL Adapter API 🚀

Welcome! This API allows you to **replace the MongoDB Data API endpoint with a SQL backend**, giving you a MongoDB-like interface to interact with SQL databases (PostgreSQL, MySQL, SQLite, D1, and more).
It’s **scalable, database-agnostic, and optimized for serverless environments** like Cloudflare Workers and Hono.

---

## 🌟 Key Features

* **MongoDB Compatibility**: Keep your existing MongoDB client code while switching to SQL.
* **Database Agnostic**: Works seamlessly with PostgreSQL, MySQL, SQLite, D1, or any SQL backend.
* **Serverless Ready**: Lightweight and optimized for Cloudflare Workers.
* **Dynamic & Extensible**: Easily add new features or support additional databases.
* **Robust Validation & Error Handling**: Ensures proper request structure and provides detailed debugging info.

---

## 🛠️ Supported Endpoints

| Endpoint           | Description                     | Example Request Body                                                                                 |
| ------------------ | ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `POST /find`       | Fetch multiple documents.       | `{ "database": "db", "collection": "users", "filter": { "age": 25 } }`                               |
| `POST /findOne`    | Fetch a single document.        | `{ "database": "db", "collection": "users", "filter": { "id": 1 } }`                                 |
| `POST /insertOne`  | Insert a single document.       | `{ "database": "db", "collection": "users", "document": { "name": "John", "age": 30 } }`             |
| `POST /insertMany` | Insert multiple documents.      | `{ "database": "db", "collection": "users", "documents": [{ "name": "John" }, { "name": "Jane" }] }` |
| `POST /updateOne`  | Update a single document.       | `{ "database": "db", "collection": "users", "filter": { "id": 1 }, "update": { "age": 31 } }`        |
| `POST /updateMany` | Update multiple documents.      | `{ "database": "db", "collection": "users", "filter": { "age": 30 }, "update": { "age": 31 } }`      |
| `POST /deleteOne`  | Delete a single document.       | `{ "database": "db", "collection": "users", "filter": { "id": 1 } }`                                 |
| `POST /deleteMany` | Delete multiple documents.      | `{ "database": "db", "collection": "users", "filter": { "age": 30 } }`                               |
| `POST /aggregate`  | Perform aggregation operations. | `{ "database": "db", "collection": "users", "pipeline": [{ "$match": { "age": 25 } }] }`             |

---

## 📦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Update your SQL connection details in `.env`. Make sure no sensitive API keys are exposed.

3. **Run API**:
   ```bash
   npm start
   ```

4. **Test Endpoints**: Use Postman, Insomnia, or curl to interact with your API.

---

## 🔧 Best Practices

* Always validate request data before inserting/updating.
* Avoid exposing credentials in your code or GitHub.
* Use proper indexing in your SQL database for faster queries.
* Modularize database operations for easy maintenance and scalability.

---

## 📧 Contact & Support

If you have questions, suggestions, or want to contribute:

* **Email**: [support@example.com](mailto:support@example.com)
* **GitHub Issues**: [Create an issue](https://github.com/Vgshots/mongodb-to-sql-adapter-api/issues)
* **Contributions**: Pull requests are welcome!

---

Made with ❤️ by [Vgshots](https://github.com/Vgshots)

`;
