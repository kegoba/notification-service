const Mailjet = require('node-mailjet');
const { CourierClient } =  require("@trycourier/courier"); 
const { response } = require('express');

const handleNotification = async (email) => {
  try {
    const courier = new CourierClient({ 
      authorizationToken: "pk_prod_2HYR75JZAT4NQ3JR8KE7AV66P7G4" 
    });

    const requestId = await courier.send({
      message: {
        content: {
          title: "Failed Automatic Debit",
          body: "Hello, kindly note that the automatic debit initiated in your account has failed. Please fund your account to enable us to conclude the action."
        },
        to: {
          email: email
        }
      }
    });

    // If successful, return 200
    return 200;

  } catch (err) {
    // If an error occurs, return 400
    return 400;
  }
};


    

module.exports = { handleNotification };
  
     


