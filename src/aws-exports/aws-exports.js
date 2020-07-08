
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

export default awsmobile;

