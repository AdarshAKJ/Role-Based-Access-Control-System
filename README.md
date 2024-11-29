### Installation and Setup

# Prerequisites

- Node.js and npm installed on your system.
- MongoDB running locally or a MongoDB Atlas account.

## Steps

1.  Clone the repository:

```
    git clone https://github.com/your-username/rbac-system.git
    cd rbac-system
```

2.  Install dependencies:

```
    npm install
```

3.  Create a .env file in the project root and configure the following:

```
    PORT=8000
    MONGO_URI=MONGO_URI=mongodb+srv://jhaadarsh50:J1mUPIySMo77qC2Q@cluster0.pbxhu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET=yoursecretkey
```

4. Start the application:

```
    npm run dev
```

**The server will run on http://localhost:8000.**
