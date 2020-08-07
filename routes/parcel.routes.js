module.exports = app => {
  const parcels = require("../controllers/parcel.controller.js");

  // Create a new parcel
  /*app.post("/parcels", function(req, res) {

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; 
    if(ip.includes("136.50.62.37"))
    {
      parcels.create(req, res);
    }
    else
    {
      res.status(404).send('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Error</title></head><body><pre>Cannot POST /parcels</pre></body></html>');
    }
  });
  */

  // Retrieve all parcels
  app.get("/parcels", parcels.findAll);

  // Retrieve a single parcel with parcelId
  //app.get("/parcels/:parcelId", parcels.findOne);

  // Update a parcel with parcelId
  //app.put("/parcels/:parcelId", parcels.update);

  // Delete a parcel with parcelId
  //app.delete("/parcels/:parcelId", parcels.delete);

  // Deletes all parcels
  //app.delete("/parcels", parcels.deleteAll);
};
