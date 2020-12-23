#!/bin/bash

echo -n "$1" | openssl sha256 -binary | openssl base64
