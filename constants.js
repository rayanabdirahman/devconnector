/**
 * Defines the port the application serves HTTP responses on
 * Set port to 3000 if process.env.PORT is not defined
 */
const PORT = process.env.PORT || 5000;

// Export constants
module.exports.PORT = PORT;
