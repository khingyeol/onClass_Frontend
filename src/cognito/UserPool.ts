import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-southeast-1_nOdb9Fgh5',
  ClientId: '3qdarkr0anhqhfo916utptakeo',
};

export default new CognitoUserPool(poolData);
