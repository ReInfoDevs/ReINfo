// require the database

const resourceController = {};

resourceController.getTechNames = async (req, res, next) => {
  console.log('Retrieving all tech names');
  const techCategory = req.body;
  try {
    const text = 'SELECT ttn.tech_name FROM tech_name ttn INNER JOIN tech_category ttc ON ttn.tech_id = ttc.id WHERE ttc.tech_category = $1';
    const queryResults = await db.query(text, [techCategory]);
    console.log(queryResults);
    // change it into an array
    res.locals.techNames = queryResults// array of tech names for category from query results
  } catch (e) {
    return next({
      stack: e.stack || 'resourceController.getTechNames failed',
      status: e.status || 404,
      message: e.message || 'An error occurred.',
    });
  }
};

resourceController.getTechResources = async (req, res, next) => {
  console.log('Retrieving tech resources');
  const techName = req.body;
  try {
    const text = 'SELECT ttr.what, ttr.how, ttr.video FROM tech_resources ttr INNER JOIN tech_name ttn ON ttr.tech_name_id = ttn.id WHERE ttn.tech_name = $1';
    const queryResults = await db.query(text, [techName]);
    console.log(queryResults);
    // change it into an array
    res.locals.techNames = queryResults// array of tech names for category from query results
  } catch (e) {
    return next({
      stack: e.stack || 'resourceController.getTechNames failed',
      status: e.status || 404,
      message: e.message || 'An error occurred.',
    });
  }
};

export default resourceController;
