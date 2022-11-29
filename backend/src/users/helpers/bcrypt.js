const bcrypt= require('bcryptjs');

 function generateHashPassword(pass){
    return  bcrypt.hashSync(pass, 10);
}

function comparePassword(pass, anotherPasssword){
    return  bcrypt.compareSync(pass, anotherPasssword);
}


module.exports= {generateHashPassword, comparePassword};

