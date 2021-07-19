SENT OTP 
url: API_BASE_URL + '/auth/sendOtp/’
method: POST
body: {
     mobile_number: {
        countryCode: '+91',
        number: '9812337489'
    }

    OR

    mobile_number: '+919812337489',

    //i can give both type of formats. But i'll need mobile_Number and countryCode seperately later in get profile. So pick one format which will be optimal for you.
}
response.success: {
	message: 'otp sent successfully”,
}
response.error: {
	message: "invalid number"
}

VERIFY OTP
url: API_BASE_URL + '/auth/verifyOtp/’
method: POST
body: {
mobile_number: '+919812337489',
otp:   '232323'
}
response.success: {
	message: 'OTP verified successfully',
    case 1: "Account already existed" {
        //just give user id and token
        token: 'jwtToken',
        userId: 'userId'
    }
	
    case 2: "New User":{
        //create user account and give user id and token
        token: 'jwtToken',
        userId: 'userId'
    }
}
response.error: {
	message: 'invalid otp'
}

SET PASSWORD  
url: API_BASE_URL + '/auth/setPassword/’
method: POST
header:{
    "Authorization": "Token \(token)",
    "Accept": "application/json",
    "Content-Type": "application/json",
}
body: {
userId: 'userId',
password:   'pass1234'
}
response.success: {
    message: "Password set successfully"

}
response.error: {
	message: 'Some meaningfull error message!'
}

LOGIN 
url: API_BASE_URL + '/auth/login/’
method: POST
body: {
mobile_number: '+919812337489',
password:   'pass1234'
}
response.success: {
	message: 'Login successfully',
	token: 'jwtToken',

}
response.error: {
	message: 'Some error occured'
}

GET PROFILE 
url: API_BASE_URL + '/profile/userId/’
method: GET
header:{
    "Authorization": "Token \(token)",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

response.success: {
	message: 'Profile details fetched successfully',
	data: {
        userId: 'userID',
        full_name: 'Deepak Verma',
        dob: '14/08/1996',
        mobile_number: {
            countryCode: '+91',
            number: '9812337489'
        }
        ...
    },

}
response.error: {
	message: 'Some error occured!'
}

