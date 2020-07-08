#!/bin/bash

YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# VARIABLES ESTANDAR
ENV=XXXXXX #THIS WORK FINE IF WE USE SAM IN LOCAL. IN PIPELINE IS NOT NEED
BUCKET=XXXXXX #BUCKET IS REQUIRED FOR SAM PACKAGE

STACK=XXXXXX-web-$ENV #NAME OF STACK, IS IMPORTANT FOR THE NAME OF ALL OBJECTS IN TEMPLATE
PROJECT=XXXXXX #PROJECT NAME FOR THE TAGS

echo -e "${YELLOW} Building SAM package and uploading cloudformation"
echo -e " ================================================= ${NC}"

sam package --template-file ./template.yaml --output-template-file packaged-template.yaml --s3-bucket $BUCKET
sam deploy --template-file packaged-template.yaml --stack-name $STACK --tags Project=$PROJECT --parameter-overrides ProjectId=$PROJECT --capabilities CAPABILITY_NAMED_IAM

echo -e "${YELLOW} Building frontend"
echo -e " =================${NC}"
npm run build --prod --prefix serverlesswebexample/

echo -e "${YELLOW} Desrcibe Stack"
echo -e " ===============${NC}"

CLOUDFRONT_DISTRIBUTION=`aws cloudformation describe-stacks --stack-name "$STACK" --output text | grep $STACK-PortalDistribution | awk -F"\t" '{$0=$5}6'`
# Deploy to AWS S3

echo -e "${YELLOW} Deploy to S3 FE"
echo -e " ===============${NC}"

aws s3 cp serverlesswebexample/dist/serverlesswebexample/ s3://$STACK/  --acl public-read --recursive
# This is to set the index cache to 1 hour so when there are updates they don't take to long to reach all users
aws s3 cp serverlesswebexample/dist/serverlesswebexample/index.html s3://$STACK/  --acl public-read --recursive --cache-control max-age=3600


echo -e "${YELLOW} Creating Invalidation "
echo -e " ===================== ${NC}"

aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION --path "/*"