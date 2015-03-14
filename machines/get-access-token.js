module.exports = {


  friendlyName: 'Get access token',
  description: 'Generate a new access token for acting on behalf of a particular Salesforce user account.',
  extendedDescription: 'Note that you must first have a valid `code` from the user proving that they\'re OK with this.\nYou can get a code by redirecting the user to the url generated by calling the `getLoginUrl(...)` machine.',

  inputs: {
    consumerKey: {
      example: 'adf90878aKsloewurSDFIUFsdisoufsodfu',
      description: 'The consumer key for your Salesforce app.',
      required: true
    },
    callbackUrl: {
      example: 'http://localhost:1337/auth/login',
      description: 'The callback URL where the end user will be redirected after visiting the login URL returned by this machine',
      required: true
    },
    consumerSecret: {
      example: 'dsg4901g0123456',
      description: 'The developer "secret" for your Salesforce app (i.e. this "Consumer Secret" is listed on your app\'s dashboard page in the Salesfore app portal)',
      required: true
    },
    code: {
      example: 'AQDvCav5zRSafS795TckAerUV53xzgqRyrcfYX2i_PJF9QOe_md7h5hy2gMhOS6TL9IBk5qxMA2q_8EJxGPTqEbmTqOBqqCIOlvPEPCeIiy21VD9_Y',
      description: 'The OAuth `code` generated by Salesforce and sent to the `callbackUrl` if the user chooses to grant your app the requested permissions',
      required: true
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: {
        id: 'https://login.salesforce.com/id/89Ej0749aEIU/2342l888888D7',
        issued_at: '2183487234723',
        scope: 'id api web refresh_token',
        instance_url: 'https://na16.salesforce.com',
        token_type: 'Bearer',
        refresh_token: '8Bfo973F7FSDdkiUYUyosdyfODI_sdkdhfIPWEdJK',
        signature: 'dkdhfIPWEd=Bfo973F7F',
        access_token: 'cxRiJv_eVFRXgJyTGnCQ5Wb!AQkAQOcxRiJv_eVFRXgNpgo9JH2sDxVWNyg.fJyTGnCQ5Wbnkpm1wuHajiI9yqoGhdF61NIJCJkiNpgo9JH2s'
      },
    },

  },


  fn: function(inputs, exits) {

    var oauth2 = require('salesforce-oauth2');

    oauth2.authenticate({
      redirect_uri: inputs.callbackUrl,
      client_id: inputs.consumerKey,
      client_secret: inputs.consumerSecret,
      code: inputs.code
    }, function(error, payload) {

      console.log("the payload: ", payload);

      var options = {
        url: payload.id,
        headers: {
          'Authorization': payload.token_type + " " + payload.access_token
        }
      };

      return exits.success(payload);

    });
  },



};
