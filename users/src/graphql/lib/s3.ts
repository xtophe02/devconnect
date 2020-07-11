import AWS from "aws-sdk";
const config = require("./config");

export default new AWS.S3(config.s3);
