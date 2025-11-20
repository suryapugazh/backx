# BackX

![npm version](https://img.shields.io/npm/v/backx)
![npm downloads](https://img.shields.io/npm/dm/backx)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D14-green)
![Platform](https://img.shields.io/badge/platform-node-lightgrey)

  BackX is a minimal Express.js backend project generator.  
  It scaffolds a clean project structure with controllers, routes, middleware, and ready-to-use server setup.

## Installation

Use the package with **npx** (recommended):

```bash
npx backx myapp
```

Or install it globally:

```bash
npm install -g backx
```

## Quick Start

Create a new project:

```bash
backx myapp
```

Generate project in current directory:

```bash
backx .
```

Then install dependencies (if you skipped):

```bash
npm install
```

Start the server:

```bash
npm start
```

Server runs at:

```
http://localhost:3000/
```

## Generated Structure

BackX generates the following project layout:

```
myapp/
  package.json
  src/
    app.js
    server.js
    controllers/
      index.controller.js
    routes/
      index.route.js
    middleware/
      error.middleware.js
```

## Scripts

### Start server:

```bash
npm start
```

## Features

- Minimal, clean Express.js setup
- Controller–Route architecture
- Ready error-handling middleware
- No view engines or DB pre-configured
- Optional dependency installation
- Easy to extend and customize

## Example

```bash
backx api-server
cd api-server
npm start
```

Now visit:

```
http://localhost:3000/
```

You will see:

```json
{
  "success": true,
  "message": "Welcome to api-server API!"
}
```

## License

[MIT](LICENSE)
