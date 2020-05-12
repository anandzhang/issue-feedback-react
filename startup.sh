#!/bin/bash

cd app/ && npm install
docker-compose -f ../docker/docker-compose.yml up -d