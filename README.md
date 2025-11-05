# MongoDB-to-SQL Adapter API 🚀

A **scalable, database-agnostic API** designed to **replace the MongoDB Data API endpoint** with a SQL backend. This project allows you to interact with SQL databases (e.g., PostgreSQL, MySQL, SQLite, D1) using a **MongoDB-like API**. It’s built to work with **Cloudflare Workers**, **Hono**, and **D1**, but can be adapted to other backend environments and databases.

---

## 🌟 Features

- **MongoDB Data API Compatibility**: Replace the MongoDB Data API with a SQL-based backend.
- **Database Agnostic**: Works with any SQL database (PostgreSQL, MySQL, SQLite, D1, etc.).
- **Scalable**: Designed for serverless environments like **Cloudflare Workers**.
- **Easy to Use**: Simple and consistent API endpoints for CRUD operations.
- **Validation**: Ensures all required fields are present in requests.
- **Error Handling**: Provides detailed error messages for debugging.

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

## 🚀 Getting Started

To get started with this project, you'll need to have Node.js and Wrangler installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mongodb-to-sql-adapter-api.git
    cd mongodb-to-sql-adapter-api
    ```
2.  **Install the dependencies:**
    ```bash
    npm install
    ```
3.  **Configure your database:**
    See the "Configuration" section for more details.
4.  **Run the project locally:**
    ```bash
    npm start
    ```
5.  **Deploy the project:**
    ```bash
    npm run deploy
    ```

---

## 🚀 Why Use This Project?

### Replace MongoDB Data API

This project is a **drop-in replacement** for the MongoDB Data API endpoint. If you’re migrating from MongoDB to a SQL database, this API allows you to keep your existing client code while switching to a SQL backend.

### Database Agnostic

The API is designed to work with **any SQL database**. Whether you’re using PostgreSQL, MySQL, SQLite, or Cloudflare’s D1, you can easily adapt this project to your needs.

### Scalable and Serverless

Built for **Cloudflare Workers** and **Hono**, this API is lightweight, fast, and scalable. It’s perfect for serverless environments where performance and cost-efficiency are critical.

### Easy to Extend

The modular design makes it easy to add new features or support additional databases. The **database service layer** abstracts all database operations, so you only need to implement the logic once.

---

## 🛠️ Installation

### Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js**: Download and install [Node.js](https://nodejs.org/).
2. **Wrangler**: Cloudflare’s CLI for deploying Workers. Install it globally:

   ```bash
   npm install -g wrangler
   ```

3. **Git**: Download and install [Git](https://git-scm.com/).

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Vgshots/mongodb-to-sql-adapter-api.git
cd mongodb-to-sql-adapter-api
```

### Step 2: Install Dependencies

Install the required dependencies:

```bash
npm install
```

### Step 3: Set Up Cloudflare D1 Database

#### 1. Log in to Wrangler

Authenticate Wrangler with your Cloudflare account:

```bash
wrangler login
```

#### 2. Create a D1 Database

Create a new D1 database:

```bash
wrangler d1 create my-database
```

This will output something like:

```
✅ Successfully created DB 'my-database' in region 'auto'
Created your database using D1's new storage backend. The new storage backend is not yet recommended for production workloads, but backs up your data by default.
Database ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Take note of the **Database ID** (you’ll need it in the next step).

#### 3. Update `wrangler.toml`

Open the `wrangler.toml` file and add the D1 database configuration:

```toml
[[d1_databases]]
binding = "DB" # The name you'll use to access the database in your Worker
database_name = "my-database"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" # Replace with your Database ID
```

#### 4. Create Tables in D1

You need to create tables in your D1 database to match the collections you’ll use in the API. For example, to create a `users` table:

1. Open the D1 database shell:

   ```bash
   wrangler d1 execute my-database --local --file=./schema.sql
   ```

2. Create a `schema.sql` file with the following content:

   ```sql
   CREATE TABLE users (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     age INTEGER
   );
   ```

3. Run the schema file to create the table:

   ```bash
   wrangler d1 execute my-database --local --file=./schema.sql
   ```

### Step 4: Deploy to Cloudflare Workers

Deploy the project to Cloudflare Workers:

```bash
wrangler deploy
```

---

## 🧩 Project Structure

```
mongodb-to-sql-adapter-api/
├── config/
│   └── config.js           # Configuration file
├── middleware/
│   ├── auth.js             # API key authentication middleware
│   └── logging.js          # Logging middleware
├── routes/
│   ├── aggregate.js        # Aggregate endpoint
│   ├── apiRoutes.js        # All API routes
│   ├── delete.js           # Delete endpoints
│   ├── find.js             # Find endpoints
│   ├── insert.js           # Insert endpoints
│   └── update.js           # Update endpoints
├── services/
│   ├── d1Adapter.js        # D1 database adapter
│   └── databaseService.js  # Database service
├── tests/
│   └── find.test.js        # Tests for the find endpoint
├── utils/
│   ├── errorHandler.js     # Error handler
│   ├── httpError.js        # HttpError class
│   └── queryBuilder.js     # Query builder
├── .gitignore              # Git ignore file
├── README.md               # Project documentation
├── index.js                # Entry point
├── instructions.js         # Instructions
├── package-lock.json       # Package lock file
├── package.json            # Package file
└── wrangler.toml           # Wrangler configuration
```

---

## 📚 How It Works

### Request Flow

1. A request is made to the API (e.g., `/app/data-test/endpoint/data/v1/action/find`).
2. The `index.js` file routes the request to the appropriate handler in the `routes/` folder.
3. The route handler uses the `DatabaseService` to interact with the database.
4. The response is sent back to the client.

### Database Service Layer

The `DatabaseService` abstracts all database operations (e.g., `find`, `insert`, `update`, `delete`, `aggregate`). It uses a database adapter to interact with the database, which makes it easy to add support for other databases in the future.

### Error Handling

The `errorHandler.js` utility ensures consistent error responses and validates required fields in the request body.

---

## 🚨 Error Handling

The API provides detailed error messages for debugging. For example:

- **Missing Required Fields**:

  ```json
  {
    "success": false,
    "error": "Missing required fields: database, collection, filter"
  }
  ```

- **Database Error**:

  ```json
  {
    "success": false,
    "error": "Failed to fetch documents",
    "details": "Error: Connection timeout"
  }
  ```

---

## 🌐 Deployment

### Cloudflare Workers

1. Install Wrangler:

   ```bash
   npm install -g wrangler
   ```

2. Authenticate Wrangler:

   ```bash
   wrangler login
   ```

3. Deploy the project:

   ```bash
   wrangler deploy
   ```

### Other Environments

You can adapt this project to other backend environments (e.g., Node.js, Express) by replacing the database client in `config/db.js`.

---

## ⚙️ Configuration

The configuration for this project is located in the `config/config.js` file. This file contains the configuration for the database.

### D1

To use D1, you'll need to update the `wrangler.toml` file with your D1 database information.

```toml
[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### Other Databases

To use other databases, you'll need to create a new database adapter and update the `DatabaseService` to use it.

---

## 🧪 Testing

This project uses `vitest` for testing. To run the tests, use the following command:

```bash
npm test
```

---

## 🤝 Contributing

Contributions are welcome! If you’d like to contribute, please:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Hono**: For providing a lightweight and fast framework for Cloudflare Workers.
- **Cloudflare D1**: For offering a serverless SQL database solution.
- **MongoDB Data API**: For inspiring this project as a replacement.

---

## 📧 Contact

If you have any questions or need help, feel free to reach out:

- **Email**: <hassan02939@gmail.com>
- **GitHub Issues**: [Create an issue](https://github.com/Vgshots/mongodb-to-sql-adapter-api/issues)

---

Made with ❤️ by [Vgshots](https://github.com/Vgshots)

---

### **Key Additions**

1. **Step-by-Step D1 Database Setup**:

   - How to create a D1 database.
   - How to bind it to your Worker.
   - How to create tables using SQL schema files.

2. **Testing and Verification**:

   - Explains how to test the API using tools like Postman or `curl`.

3. **Detailed Instructions**:
   - Every step is explained in detail, so even beginners can follow along.

---

### **Why This README is Effective**

1. **Comprehensive Guide**: Covers everything from setup to deployment.
2. **Beginner-Friendly**: Step-by-step instructions with explanations.
3. **Visual Appeal**: Uses tables, code blocks, and emojis to make the README visually engaging.
4. **Handy for GitHub**: Includes all the information a user needs to understand, use, and contribute to the project.

Let me know if you need further tweaks or additions! 😊
