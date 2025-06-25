const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const rootValue = require('./graphql/resolvers');
const apiRoutes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const { setupSocketIO } = require('./socket');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: process.env.NODE_ENV === 'development',
}));

// API Documentation
app.use('/api/docs', express.static('docs'));

// Error handler
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Set up Socket.IO
setupSocketIO(server);

module.exports = app;
