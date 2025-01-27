export const instructions = `
# Welcome to the MongoDB-to-SQL Adapter API 🚀

This API is designed to **replace the MongoDB Data API endpoint** with a SQL backend. It allows you to interact with SQL databases (e.g., PostgreSQL, MySQL, SQLite, D1) using a **MongoDB-like API**.

---

## 🛠️ Supported Endpoints

| Endpoint           | Description                     | Example Request Body                                                                                 |
| ------------------ | ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| \`POST /find\`       | Fetch multiple documents.       | \`{ "database": "db", "collection": "users", "filter": { "age": 25 } }\`                               |
| \`POST /findOne\`    | Fetch a single document.        | \`{ "database": "db", "collection": "users", "filter": { "id": 1 } }\`                                 |
| \`POST /insertOne\`  | Insert a single document.       | \`{ "database": "db", "collection": "users", "document": { "name": "John", "age": 30 } }\`             |
| \`POST /insertMany\` | Insert multiple documents.      | \`{ "database": "db", "collection": "users", "documents": [{ "name": "John" }, { "name": "Jane" }] }\` |
| \`POST /updateOne\`  | Update a single document.       | \`{ "database": "db", "collection": "users", "filter": { "id": 1 }, "update": { "age": 31 } }\`        |
| \`POST /updateMany\` | Update multiple documents.      | \`{ "database": "db", "collection": "users", "filter": { "age": 30 }, "update": { "age": 31 } }\`      |
| \`POST /deleteOne\`  | Delete a single document.       | \`{ "database": "db", "collection": "users", "filter": { "id": 1 } }\`                                 |
| \`POST /deleteMany\` | Delete multiple documents.      | \`{ "database": "db", "collection": "users", "filter": { "age": 30 } }\`                               |
| \`POST /aggregate\`  | Perform aggregation operations. | \`{ "database": "db", "collection": "users", "pipeline": [{ "$match": { "age": 25 } }] }\`             |

---

## 📧 Contact

If you have any questions or need help, feel free to reach out:

- **Email**: your-email@example.com
- **GitHub Issues**: [Create an issue](https://github.com/your-username/mongodb-to-sql-adapter-api/issues)

---

Made with ❤️ by [Your Name](https://github.com/your-username)
  
`;
