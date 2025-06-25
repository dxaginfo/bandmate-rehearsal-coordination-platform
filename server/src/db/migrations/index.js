const fs = require('fs');
const path = require('path');
const db = require('../connection');
const logger = require('../../utils/logger');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

// Create migrations table if it doesn't exist
async function setupMigrationsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (error) {
    logger.error('Error setting up migrations table:', error);
    process.exit(1);
  }
}

// Get list of executed migrations
async function getExecutedMigrations() {
  try {
    const result = await db.query('SELECT name FROM migrations ORDER BY id');
    return result.rows.map(row => row.name);
  } catch (error) {
    logger.error('Error getting executed migrations:', error);
    process.exit(1);
  }
}

// Run migrations
async function runMigrations() {
  try {
    await setupMigrationsTable();
    const executedMigrations = await getExecutedMigrations();
    
    // Get all migration files
    const migrationFiles = fs.readdirSync(__dirname)
      .filter(file => file.endsWith('.sql') && file !== 'index.sql')
      .sort(); // Sort to ensure migrations run in order
    
    // Run migrations that haven't been executed yet
    for (const file of migrationFiles) {
      if (!executedMigrations.includes(file)) {
        logger.info(`Running migration: ${file}`);
        
        const migrationSql = fs.readFileSync(path.join(__dirname, file), 'utf8');
        const client = await db.getClient();
        
        try {
          await client.query('BEGIN');
          await client.query(migrationSql);
          await client.query('INSERT INTO migrations (name) VALUES ($1)', [file]);
          await client.query('COMMIT');
          logger.info(`Migration ${file} executed successfully`);
        } catch (error) {
          await client.query('ROLLBACK');
          logger.error(`Error running migration ${file}:`, error);
          process.exit(1);
        } finally {
          client.release();
        }
      } else {
        logger.info(`Migration ${file} already executed`);
      }
    }
    
    logger.info('All migrations executed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error running migrations:', error);
    process.exit(1);
  }
}

runMigrations();
