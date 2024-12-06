#!/bin/bash

set -e

echo "Initialisation de MongoDB Replica Set..."
docker compose exec -T mongo mongosh <<EOF
rs.initiate();
rs.reconfig({
  _id: 'rs0',
  members: [
    { _id: 0, host: 'mongo:27017' }
  ]
}, { force: true });
exit;
EOF

echo "Exécution de 'npm run resetdb'..."
docker compose exec app npm run resetdb

echo "Initialisation terminée avec succès."