const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const https = require('https');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.listen(port, () => console.log(`Listening on port ${port}`));

const routes = require('./routes');
app.use('/api', routes)





/**
 * NodeJs Server-Side Example for Fine Uploader S3.
 * Maintained by Widen Enterprises.
 *
 * This example:
 *  - handles non-CORS environments
 *  - handles delete file requests assuming the method is DELETE
 *  - Ensures again the file size does not exceed the max (after file is in S3)
 *  - signs policy documents (simple uploads) and REST requests
 *    (chunked/multipart uploads)
 *  - supports version 2 and version 4 signatures
 *
 * Requirements:
 *  - express 3.3.5+ (for handling requests)
 *  - crypto-js 3.1.5+ (for signing requests)
 *  - aws-sdk 2.1.10+ (only if utilizing the AWS SDK for deleting files or otherwise examining them)
 *
 * Notes:
 *
 *  Change `expectedMinSize` and `expectedMaxSize` from `null` to integers
 *  to enable policy doc verification on size. The `validation.minSizeLimit`
 *  and `validation.maxSizeLimit` options **must** be set client-side and
 *  match the values you set below.
 *
 */







// Handles all signature requests and the success request FU S3 sends after the file is in S3
// You will need to adjust these paths/conditions based on your setup.

