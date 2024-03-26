# Rhombus AI Client

A web application that processes and displays data, focusing on data type inference 
and conversion for datasets using Python and Pandas.

## Table of Contents

- [Description](#description)
- [Setup](#setup)
    - [Dependencies](#dependencies)
    - [Getting Started](#getting-started)
    - [Start Project](#Starting-the-project)

## Description

Develop a frontend application using a JavaScript framework,
preferably React, to interact with the Django backend.

- The frontend should allow users to upload data (CSV/Excel files),
submit it for processing, and display the processed data.
- The app could map the backend (Pandas) data types to user-friendly
names; for instance, the 'object' data type could be mapped to 'Text',
and 'datetime64' could be mapped to 'Date', etc.
- Consider offering users the option to override the data types inferred by
the script, allowing them to set their own data types for columns if
needed.

## Setup

### Dependencies

List of main libraries, tools, etc. needed:

- [React.js - Vite](https://vitejs.dev/) - A JavaScript library for building user interfaces
- [NPM](https://www.npmjs.com/) - A package manager
- [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development


### Getting Started

- Clone the repository
- Navigate to the project directory client - `cd client`

## Starting the project

The project can be started by:


1. NPM Server (Development)


#### Ports

Ensure that port :3000 (Development Server) is available and not occupied by any other service.


### Deployment Procedure (Dev Server)

#### Setup Project
- Install project dependencies by running:
```shell
npm install
```
- Start the server:
```shell
npm run dev
```
