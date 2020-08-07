const Parcel = require("../models/parcel.model.js");

// Create and Save a new Parcel
exports.create = (req, res) => {

	//validate request
	if(!req.body)
	{

		res.status(400).send({message: "Content cannot be empty!"});

	}	

	//create a parcel
	const parcel = new Parcel({id: req.body.id, locationId: req.body.locationId, sentDate: req.body.sentDate});
	console.log(parcel);
	//save the parcel to the DB
	Parcel.create(parcel, (err, data) => {
		if(err)
		{
			res.status(500).send({message: "Some error occurred while creating the Parcel."});
		}
		else 
		{
			res.send(data);
		};
 	}); 
};

// Retrieve all Parcels from the database.
exports.findAll = (req, res) => {
  	Parcel.getAll((err, data) => {

	//var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

	//res.status(200).send{message: ip });	
	
    	if (err)
	{
      		res.status(500).send({ message: err.message || "Some error occurred while retrieving the parcels."});
	}
    	else
	{ 
		res.send(data);
	}
  });
};


// Find a single Parcel with a parcelId
exports.findOne = (req, res) => {
  Parcel.findById(req.params.parcelId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Did not find Parcel with id ${req.params.parcelId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Parcel with id " + req.params.parcelId
        });
      }
    } else res.send(data);
  });
};



// Update a Parcel identified by the parcelId in the request
exports.update = (req, res) => {
 // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Parcel.updateById(
    req.params.parcelId,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Did not find Parcel with id ${req.params.customerId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Parcel with id " + req.params.parcelId
          });
        }
      } else res.send(data);
    }
  );  
};

// Delete a Parcel with the specified parcelId in the request
exports.delete = (req, res) => {
Parcel.remove(req.params.parcelId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Did not find Parcel with id ${req.params.parcelId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Parcel with id " + req.params.parcelId
        });
      }
    } else res.send({ message: `Parcel was deleted successfully!` });
  });  
};

// Delete all Parcels from the database.
exports.deleteAll = (req, res) => {
  Parcel.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all parcels."
      });
    else res.send({ message: `All parcels were deleted successfully!` });
  });  
};
