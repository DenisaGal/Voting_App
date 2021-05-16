const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});

function encodeRSA(user)
{
    var encrypted_token = key.encrypt(user, 'base64');
    return encrypted_token;
}

function decodeRSA(token)
{
    var decrypted_token = key.decrypt(token,'json');
    return decrypted_token;
}

// test_dummy = {
//     County: 'U2FsdGVkX1/eODUk0HWNXD7AHKYZQTI2iVlOMBHTHJg=',       
//     Admin: false,
//     Last_Name: 'U2FsdGVkX18Mb6BWVFC8JNQXQkxeWEleF4oreWwrTXA=',    
//     First_Name: 'U2FsdGVkX1+EQ9y2MfCg4J6aHlBJCzJ3WoQUV2JN+NU=',   
//     City: 'U2FsdGVkX18NhizyS1dnbaALKymh9WAIEfp43KHNLDg=',
//     CID: 'U2FsdGVkX19j12dznAND1B8xaqMN+XzmGEj5RY+S5Ew=',
//     n: 'new',
//     Email_Address: 'U2FsdGVkX1+AktzNhRrp7DGVV83vpnqwAK822eT7C5E=',
//     Street: 'U2FsdGVkX1+eucugBCuFKeZ05ndbGxH4AX1e1rLDpoY=',       
//     Gender: 'U2FsdGVkX19w/EM7lbcBZ6uL6Jhmu7TZfDS+VLylkls=',       
//     Number: 'U2FsdGVkX18B3s0YZYYu2Z7neDwmfW5Exsm6pAasewE='        
//   };

// console.log(encodeRSA(test_dummy));
// console.log(decodeRSA(encodeRSA(test_dummy)));

module.exports={encodeRSA,decodeRSA};