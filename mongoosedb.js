const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});

var Schema = mongoose.Schema;

const userSchema = new Schema({
    email:String,
    password:String,
});

// var encKey = process.env.SOME_32BYTE_BASE64_STRING;
// var sigKey = process.env.SOME_64BYTE_BASE64_STRING;
//  {encrytionKey: encKey, signingKey: sigKey}
var secret = "Thisisareallylongtexticreatedtoencryptedformyauthenticationweb";
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"] });

exports.User = mongoose.model("User", userSchema);