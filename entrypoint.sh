#!/bin/bash

set -e

message=$(cat << EOF
Error starting container. Missing one or two environment variables.

You must specify CLIENT_ID and ORG_ID to a non-empty values.
For example, "-e CLIENT_ID=clientid -e ORG_ID=orgid" on "docker run".
EOF
)

auto_config() {
  local config_file="${CONFIG_FILE:-./public/local/api/config.json}"
  local output_file="${OUTPUT_FILE:-./temp.json}"

  defined_envs=$(printf '${%s} ' $(env | cut -d= -f1))

  ## Checking for the presence of required variables
  [[ -z "$CLIENT_ID" || -z "$ORG_ID" ]] && echo "$message" && exit 1

  # Replace values in file with values from variables
  jq --arg client_id "$CLIENT_ID" --arg org_id "$ORG_ID" \
    '.auth.params.client_id = $client_id | .options.headers."X-Org-ID" = $org_id' \
    public/local/api/config.json > "$output_file"
  # Delete temporary file
  cat "$output_file" > "$config_file" && rm "$output_file"
}

auto_config

exec "$@"
