# Description

This repository has a backend implemented in AWS cloudformation. In the template.yaml file you will find the following resources:
- S3 bucket: For storage the static WebSite
- CloudFront Distribution: CloudFront Distribution for a S3 Static WebSite

## Before starting
Must have installed AWS CLI and SAM. After install AWS CLI configure the AWS CLI to execute the commands in your AWS account.

NodeJs is required for Build the lambda trigger.

### Installing AWS CLI & SAM
- [AWS CLI Installer](https://docs.aws.amazon.com/es_es/cli/latest/userguide/cli-chap-install.html)
- [SAM Installer](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

### Installing NodeJs
- [NodeJs & NPM Installer](https://nodejs.org/en/)
- [Angular Cli](https://cli.angular.io)

# Usage
You can either implement the tamplate with your favorite SAM command, or run the **deploy.sh** file. Note that you should replace the variables within the file.

### Environments
- **ENV**: This work fine if we use SAM in local. In Pipeline is not needed
- **BUCKET**: Bucket is required for [SAM Package](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-package.html)
- **STACK**: Name of stack in CloudFormation, is reference for the name of objects in template
- **PROJECT**: Tag for all resources

### Environments in aws-exports
The file is stored in **src/aws-exports/aws-exports.js**
```js
const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_identity_pool_id": "us-east-1:XXXXXX",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_XXXXX",
    "aws_user_pools_web_client_id": "XXXXX",
    "aws_appsync_graphqlEndpoint": "XXXXX.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
    "aws_appsync_apiKey": "null",
    "oauth": {
        "domain": 'serverlesswebexample.auth.us-east-1.amazoncognito.com',
        "scope": ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        "redirectSignIn": 'http://<MyDomain>:4200/auth',
        "redirectSignOut": 'http://<MyDomain>:4200/logout',
        "responseType": 'code'
    }
};
```