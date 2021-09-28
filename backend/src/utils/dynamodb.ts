import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

let options: any = {
  region: process.env.DB_REGION
}

if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  }
}

export const dynamodb = new XAWS.DynamoDB(options)
export const docClient = new XAWS.DynamoDB.DocumentClient(options)
