require('dotenv').config();
const https = require('https');

const acceptPayment = async (email, amount) => {
  try {
    const params = JSON.stringify({
      "email": email,
      "amount": amount * 100
    });

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_KEY}`, // Your secret key from the Paystack dashboard
        'Content-Type': 'application/json'
      }
    };

    // Wrapping the request in a promise to handle async behavior
    const response = await new Promise((resolve, reject) => {
      const clientReq = https.request(options, apiRes => {
        let data = '';

        apiRes.on('data', (chunk) => {
          data += chunk;
        });

        apiRes.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', error => {
        reject(error);
      });

      clientReq.write(params);
      clientReq.end();
    });
    return response;

  } catch (error) {
    // Handle any errors that occur during the request
    
    return error;
  }
}





const verifyPayment = async (reference) => {
  try {
    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: `/transaction/verify/${reference}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_KEY}`
      }
    };

    // Wrapping the request in a promise to handle async behavior
    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, res => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', error => {
        reject(error);
      });

      req.end();
    });
    return response;

  } catch (error) {
    console.error(error, "here");
    return error;
  }
}




module.exports = { acceptPayment , verifyPayment};
