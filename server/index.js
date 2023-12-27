const express = require("express");
const app = express();
const port = 3000;
const leaveRouter = require("./routes/leave");
const jwt = require('jsonwebtoken');
const config = require('./config');

//const db = require('./services/db');
//const helper = require('./helper');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

//JWT Authentication and Authorization
// Sample user data (in-memory for simplicity)
const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', role: 'user' },
];

// Authentication route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Example: Validate credentials (replace with database validation)
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, config.secret_key, { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Authorization middleware
const authorizeUser = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, config.secret_key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded; // Attach user information to the request
    next();
  });
};

// Protected route example
app.get('/api/profile', authorizeUser, (req, res) => {
  // Access user information from the request
  const { userId, username, role } = req.user;

  res.json({ userId, username, role, message: 'Authorized access to profile' });
});



//End of JWT Authentication and authorization




app.use("/testleave", authorizeUser, leaveRouter);
/*
app.get("/leave/:leave_type/:days", async (req, res, next)=>{
  try {
    const {leave_type,days} = req.params;
    
    res.json({
      leave_type:`${leave_type}`,
      days: `${days}`
  });
  
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
app.get("/leave", async(req, res, next)=>{
  const {leave_type,days} = req.query;
  res.json({
    leave_type:`${leave_type}`,
    days: `${days}`
});

});
*/
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});