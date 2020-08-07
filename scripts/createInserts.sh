#!/bin/bash

printf -v padded "%03d" $1

for i in {1..5}
do
    echo "INSERT INTO USPS.PARCEL(id, locationId, sentDate) VALUES($i$padded, $i, '$2');" 
done
