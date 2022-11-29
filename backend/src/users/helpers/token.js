
const jwt = require('jsonwebtoken');

function generateAuthToken (user) {
    const token = jwt.sign(
      { _id: user._id, biz: user.biz },
     "YourPrivateKey"
    );
    return token;
  };
  //פונקציה שמחזירה נתונים של משתמש במידה וקיים וערך ריק במידה ומשתמש לא קיים
  function verfyToken (tokenFromUSer){
       try{
        const userData =  jwt.verify(tokenFromUSer,   "YourPrivateKey"   );
        return userData;
       }
       catch
        {
            return null;
        }
  }
  // to do add here  function to verify the token 
  module.exports= {generateAuthToken, verfyToken} ;