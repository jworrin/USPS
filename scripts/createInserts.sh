#!/bin/bash

printf -v padded "%03d" $1

echo "" > inserts.sql

#output=insert.sql

for i in {1..5}
do
    echo "INSERT INTO PARCEL(id, locationId, sentDate) VALUES($i$padded, $i, '$2');" >> inserts.sql 
done

mysql -upostmaster -ppostmanpat -DUSPS < inserts.sql > output.txt

