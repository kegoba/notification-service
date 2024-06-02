# notification-service

# API doc



STEPS TO RUN THE APP.
1 => git clone : 
2 => npm install
3. => replace the data base_url with yours
4. => npm start
5.  => register as a user //  check below for the api url
6. =>  Login    // copy ur token and id. you will need it in below step


{
    "name": "YOUR_NAME",
    "phone": "YOUR_PHONE_NUMBER",
    "email": "YOUR_EMAIL",
    "password" : " PASSWORD",
    "userId" : "665a13c933030be3a50e210c",
    "amount"  : 4000,
    "reference": "0r8zl83c2y"
}




## API doc
 BASE_URL : http://localhost:8000/api/v1


register user 

URL : /user/register

method : post

parameters

{
    "name": "YOUR_NAME",
    "phone": "YOUR_PHONE_NUMBER",
    "email": "YOUR_EMAIL",
    "password" : " PASSWORD",
}


Response 

{
    "data": "Registered Succesfully"
}


login user 

URL : /user/login

method : post

parameters

{
    "email": "YOUR_EMAIL",
    "password" : " PASSWORD",
}


Response 

{
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWNjZjNiMjQ5Mzc5Njg4ZWRjNTJmYSIsImlhdCI6MTcxNzM1ODUxMSwiZXhwIjoxNzE3NDQ0OTExfQ.IM3pDHpDTzZM89kbaavY6ltoHhmx6FcDsaQ_N7LszaE",
        "email": "egoba5kelvin@gmail.com",
        "phone": "08130888745",
        "id": "665ccf3b249379688edc52fa"
    }
}



GET ALL USERS
URL : '/user/getallusers',

method : GET



GET SINGLE USER 

URL '/user/getsingleuser', 

method : GET

 paramter 

 "userId" : "your id" eg : 665a13c933030be3a50e210c


 GET SINGLE USER 

URL '/user/getsingleuser', 

method : GET

 
 
 
 TO DELETE ALL USER
 
 URL :"/user/deletealluser",  

 method : delete


WALLET  TRANSACTIONS.

TO CREATE WALLET AFTER REGISTRATION

URL :  '/create', 

method : post

paramter

{
    userId : "your ID"
}

response

{
    "user": "665ccf3b249379688edc52fa",
    "balance": 0,
    "paymentReference": [],
    "_id": "665cdc0a249379688edc52fe",
    "createdAt": "2024-06-02T20:54:34.126Z",
    "updatedAt": "2024-06-02T20:54:34.126Z",
    "__v": 0
}



TO CHECK YOU WALLET BALANCE 

URL :   'wallet/balance', 

method : get

paramter

{
    userId : "your ID"
}

response

{
    "balance": 0
}


TO CREDIT WALLET MANUALLY

URL :  'wallet/credit',  

method : post

paramter

{
    userId : "your ID"
    amount :  5000
}

response

{
    "_id": "665cdc0a249379688edc52fe",
    "user": "665ccf3b249379688edc52fa",
    "balance": 5000,
    "paymentReference": [],
    "createdAt": "2024-06-02T20:54:34.126Z",
    "updatedAt": "2024-06-02T21:00:34.185Z",
    "__v": 0
}



AUTOMATIC DEBIT FOR SINGLE USER


URL :   'wallet/autodebit',  

method : post

paramter

{
    userId : "your ID"
    amount :  5000
}

response
success

{
    "data": {
        "_id": "665cdc0a249379688edc52fe",
        "user": "665ccf3b249379688edc52fa",
        "balance": 4998,
        "paymentReference": [],
        "createdAt": "2024-06-02T20:54:34.126Z",
        "updatedAt": "2024-06-02T21:26:35.757Z",
        "__v": 0
    },
    "message": "Debited Successfully"
}


failure

{
    "data": "Debit Failed",
    "wallet": {
        "_id": "665cdc0a249379688edc52fe",
        "user": "665ccf3b249379688edc52fa",
        "balance": 4998,
        "paymentReference": [],
        "createdAt": "2024-06-02T20:54:34.126Z",
        "updatedAt": "2024-06-02T21:26:35.757Z",
        "__v": 0
    }
}







AUTOMATIC DEBIT FOR ALL USER


URL :   'wallet/autobulk',  

method : post

paramter

{
    userId : "your ID"
    amount :  5000
}

response
{
    "message": "Bulk debit process completed",
    "successfulDebits": [
        {
            "user": {
                "_id": "665a13c933030be3a50e210c",
                "email": "egobakelvin@gmail.com",
                "phone": "07038034761",
                "role": "user",
                "createdAt": "2024-05-31T18:15:37.393Z",
                "updatedAt": "2024-05-31T18:15:37.393Z",
                "__v": 0
            },
            "wallet": {
                "_id": "665aa9339f0eec3b499a26b7",
                "user": "665a13c933030be3a50e210c",
                "balance": 3999,
                "createdAt": "2024-06-01T04:53:07.365Z",
                "updatedAt": "2024-06-02T21:32:13.343Z",
                "__v": 1,
                "paymentReference": [
                    "pjdcm2xg4e"
                ]
            }
        },
        {
            "user": {
                "_id": "665aafbe52b3dee52bf49eab",
                "email": "egobadorcas@gmail.com",
                "phone": "08130888740",
                "role": "user",
                "createdAt": "2024-06-01T05:21:02.842Z",
                "updatedAt": "2024-06-01T17:38:33.911Z",
                "__v": 0
            },
            "wallet": {
                "paymentReference": [],
                "_id": "665aafe152b3dee52bf49eae",
                "user": "665aafbe52b3dee52bf49eab",
                "balance": 2007,
                "createdAt": "2024-06-01T05:21:37.747Z",
                "updatedAt": "2024-06-02T21:32:13.378Z",
                "__v": 1
            }
        },
        {
            "user": {
                "_id": "665ccf3b249379688edc52fa",
                "email": "egoba5kelvin@gmail.com",
                "phone": "08130888745",
                "role": "user",
                "createdAt": "2024-06-02T19:59:55.203Z",
                "updatedAt": "2024-06-02T19:59:55.203Z",
                "__v": 0
            },
            "wallet": {
                "_id": "665cdc0a249379688edc52fe",
                "user": "665ccf3b249379688edc52fa",
                "balance": 4997,
                "paymentReference": [],
                "createdAt": "2024-06-02T20:54:34.126Z",
                "updatedAt": "2024-06-02T21:32:13.476Z",
                "__v": 0
            }
        }
    ],
    "failedDebits": [
        {
            "user": {
                "_id": "665ccd1e7c4de028dca1eb8e",
                "email": "egoba.kelvin@gmail.com",
                "phone": "081308887401",
                "role": "user",
                "createdAt": "2024-06-02T19:50:54.457Z",
                "updatedAt": "2024-06-02T19:50:54.457Z",
                "__v": 0
            },
            "wallet": null
        },
        {
            "user": {
                "_id": "665cceb276ab94aa252bb08c",
                "email": "egoba1kelvin@gmail.com",
                "phone": "08130888741",
            
                "role": "user",
                "createdAt": "2024-06-02T19:57:38.385Z",
                "updatedAt": "2024-06-02T19:57:38.385Z",
                "__v": 0
            },
            "wallet": null
        },
        {
            "user": {
                "_id": "665ccf2676ab94aa252bb08e",
                "email": "egoba2kelvin@gmail.com",
                "phone": "08130888742",
                "role": "user",
                "createdAt": "2024-06-02T19:59:34.018Z",
                "updatedAt": "2024-06-02T19:59:34.018Z",
                "__v": 0
            },
            "wallet": null
        }
    ]
}



FUNDING YOUR WALLET WITH PAYSTACK.


url : "/payment/makepayment", 

parameter 

{
    email : "your email",
    amount : 4000
}

success
{
    "message": {
        "status": true,
        "message": "Authorization URL created",
        "data": {
            "authorization_url": "https://checkout.paystack.com/gzn67yhfwy7prde",
            "access_code": "gzn67yhfwy7prde",
            "reference": "wfd1jesnbx"
        }
    }
}



failure  // no network


{
    "message": {
        "errno": -3008,
        "code": "ENOTFOUND",
        "syscall": "getaddrinfo",
        "hostname": "api.paystack.co"
    }
}




TO VERIFY YOUR AND CONCLUDE THE PAYMENT ,
copy the paytack link and paste on the browser to conclude. 
eg : "https://checkout.paystack.com/gzn67yhfwy7prde"

then before you can now verify it.

also ensure you use copy above reference and use it to conclude your payment

url : "/payment/verify", 

method post 

paramters 

{
    "reference": "wfd1jesnbx"
}


response

{
    "_id": "665cdc0a249379688edc52fe",
    "user": "665ccf3b249379688edc52fa",
    "balance": 4998,
    "paymentReference": [
        "wfd1jesnbx"
    ],
    "createdAt": "2024-06-02T20:54:34.126Z",
    "updatedAt": "2024-06-02T21:50:38.467Z",
    "__v": 1
}















