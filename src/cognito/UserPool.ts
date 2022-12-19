import { CognitoUserPool } from 'amazon-cognito-identity-js';
import config from '../Config';

const poolData = {
  UserPoolId: config.cognitoUserPoolId,
  ClientId: config.cognitoClientId,
};

export default new CognitoUserPool(poolData);
