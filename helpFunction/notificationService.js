
const { CourierClient } =  require("@trycourier/courier"); 


const handleNotification = async (email, amount) => {
  try {
    const courier = new CourierClient({ 
      authorizationToken: process.env.EMAIL_KEY
    });

    const requestId = await courier.send({
      message: {
        content: {
          title: "Failed Automatic Debit",
          body: `Hello, kindly note that the automatic debit of ${amount} initiated in your account has failed. Please fund your account to enable us to conclude the action.`
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
  
     


