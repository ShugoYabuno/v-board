const header = app => {
  app.use((req, res, next) => {
    res.header({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
      'Cache-Control': 'no-store',
      'Pragma': 'no-cache'});
    next()
  })
}

export default header
