import supabase from '../config/supabaseClient.js';
import pkg from 'pg';
const { Pool } = pkg;

const resourceController = {};

const pool = new Pool({
  connectionString: process.env.SUPABASE_URI,
});

const db = {
  query: async (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

resourceController.getCategories = async (req, res, next) => {
  console.log('Retrieving categories');
  try {
    const query =
      'SELECT array_agg(ttc.tech_category ORDER BY ttc.tech_category) FROM tech_category ttc';
    const queryResults = await db.query(query, []);

    console.log(`data: ${queryResults.rows[0].array_agg}`);
    res.locals.categories = queryResults.rows[0].array_agg;
    return next();
  } catch (e) {
    const errorObj = {
      stack: e.stack || 'resourceController.getCategories failed',
      status: e.status || 404,
      message: e.message || 'An error occurred.',
    };
    console.error(JSON.stringify(e, null, 2));
    return next(errorObj);
  }
};

resourceController.getTechNames = async (req, res, next) => {
  console.log('Retrieving all tech names');
  const techCategory = req.body.techCategory;
  console.log(techCategory);
  try {
    const query =
      'SELECT array_agg(ttn.tech_name ORDER BY ttn.tech_name) FROM tech_name ttn INNER JOIN tech_category ttc ON ttn.tech_id = ttc.id WHERE ttc.tech_category = $1';
    const queryResults = await db.query(query, [techCategory]);

    console.log(`data: ${queryResults.rows[0].array_agg}`);
    res.locals.techNames = queryResults.rows[0].array_agg;
    return next();
  } catch (e) {
    const errorObj = {
      stack: e.stack || 'resourceController.getTechNames failed',
      status: e.status || 404,
      message: e.message || 'An error occurred.',
    };
    console.error(JSON.stringify(e, null, 2));
    return next(errorObj);
  }
};

resourceController.getTechResources = async (req, res, next) => {
  console.log('Retrieving tech resources');
  const tech = req.body.tech;
  console.log(tech);
  try {
    const text =
      'SELECT ttr.what, ttr.how, ttr.video FROM tech_resources ttr INNER JOIN tech_name ttn ON ttr.tech_name_id = ttn.id WHERE ttn.tech_name = $1';
    const queryResults = await db.query(text, [tech]);

    console.log(queryResults.rows);
    res.locals.techResources = queryResults.rows;
    return next();
  } catch (e) {
    return next({
      stack: e.stack || 'resourceController.getResources failed',
      status: e.status || 404,
      message: e.message || 'An error occurred.',
    });
  }
};

export default resourceController;
