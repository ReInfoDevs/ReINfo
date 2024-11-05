// require the database

const resourceController = {};

resourceController.getResources = async (req, res, next) => {
  console.log('Retrieving all resources');
  try {
  } catch (e) {
    return next({
      log: 'Express error handler caught unknown error',
      status: 500,
      message: { err: 'An error occurred.' },
    });
  }
};
