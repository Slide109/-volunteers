#!/urs/bin/env bash

SCHEMA_PATH="./src/graphql/schema.graphql"
TYPES_PATH="./src/types/gql.ts"
ENDPOINT="http://localhost:3030/graphql/query"

node node_modules/graphql-cli/dist/bin.js get-schema -e=${ENDPOINT} -o=${SCHEMA_PATH}

node node_modules/graphql-schema-typescript/lib/cli.js generate-ts ${SCHEMA_PATH} --output ${TYPES_PATH}