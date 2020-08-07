const sql = require("./db.js");

//constructor
const Parcel = function(parcel) {
	this.id = parcel.id;
	this.locationId = parcel.locationId;
	this.sentDate = parcel.sentDate;
	this.receivedDate = parcel.receivedDate;
	this.locationName = parcel.locationName;
};

/*Parcel.create = (newParcel, result) => {
	let todo = [newParcel.id, newParcel.locationId, newParcel.sendDate];
	console.log("TODO: " + todo);
	sql.query("INSERT INTO USPS.PARCEL(id, locationid, sendDate) VALUES( todo, newParcel, (err,res) => {
		if (err)
		{
			console.log("error: ", err);
			result(err, null);
			return;
		}

	console.log("created parcel: ", {id: res.insertId, ...newParcel});
	result(null, {id: res.insertId, ...newParcel}); 
	});
};
*/
Parcel.findById = (parcelId, result) => {
  sql.query(`SELECT p.sentDate, p.receivedDate, l.name FROM PARCEL p, LOCATION l WHERE p.locationId = l.id AND l.id = ${parcelId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found parcel: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found parcel with the id
    result({ kind: "not_found" }, null);
  });
};


Parcel.getAll = result => {
  sql.query("SELECT DATE_FORMAT(p.sentDate,'%Y-%m-%d') as sentDate, DATEDIFF(receivedDate,sentDate) as days, l.name FROM USPS.PARCEL p, LOCATION l where p.locationId = l.id AND p.receivedDate IS NOT NULL ORDER BY l.name, p.sentDate", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Parcels: ", res);
    result(null, res);
  });
};

Parcel.updateById = (id, parcel, result) => {
  sql.query(
    "UPDATE USPS.PARCEL SET receivedDate = ? WHERE id = ?",
    [parcel.receivedDate, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Parcel with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Parcel: ", { id: id, ...parcel });
      result(null, { id: id, ...parcel });
    }
  );
};
 
Parcel.remove = (id, result) => {
  sql.query("DELETE FROM USPS.PARCEL WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted parcel with id: ", id);
    result(null, res);
  });
};

Parcel.removeAll = result => {
  sql.query("DELETE FROM USPS.PARCEL", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} parcels`);
    result(null, res);
  });
};

module.exports = Parcel;
