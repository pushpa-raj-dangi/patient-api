# Patient Scheduling API

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com/)
[![Redis](https://img.shields.io/badge/Redis-Caching-red)](https://redis.io/)

A scalable patient scheduling API optimized for high traffic, featuring Redis caching, connection pooling, and rate limiting.

## Features

- 📅 Get patient appointments with caregiver details
- ⚡ Optimized SQL queries with JOIN operations
- 🚀 Redis caching layer for frequent requests
- 🔒 Rate limiting for API protection
- 🐳 Docker containerization support
- 📊 PostgreSQL database integration

## Installation

```bash
## Clone repository
https://github.com/pushpa-raj-dangi/patient-api.git

## Install dependencies
npm install

# Run App
docker-compose up -d
