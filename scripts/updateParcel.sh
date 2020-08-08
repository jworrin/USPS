#!/bin/bash

# Make sure 1 or 2 params were passed in
if [ $# -eq 0 ] || [ $# -gt 2 ] || [ "$1" == "?" ]
then
  printf "This is how you call the script: ./updateParcel 1001 2020-08-01* \nThis script requires at least one argument, but up to two.  1st: parcelId 2nd: Date.  If date not supplied, todays date is assumed.\n"
  exit 1;
fi

# First param must be a number
if [ "$1" -ne "$1" ]
then
  echo "not a number" 
  exit 1;
fi

# first param must have a length of 4
if [ "${#1}" -ne 4 ]
then
  echo "number must be 4 digits long"
  exit 1
fi

# if they only passed in 1 param then we assume todays date for the date
if [ $# -eq 1 ]
then
  date=$(date '+%Y-%m-%d')
else
  date=$2
fi

echo "" > update.sql
echo "here"
echo "UPDATE PARCEL SET receivedDate = '$date' where id = $1;" >> update.sql 

mysql -upostmaster -ppostmanpat -DUSPS < update.sql > updateOutput.txt

