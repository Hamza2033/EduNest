pragma solidity ^0.5.8;

contract Project{
    
    struct User {
    string name;
    string accountType;
    

    bool set; // This boolean is used to differentiate between unset and zero struct values
}

mapping(address => User) public users;
address[] private addresses;
address public _userAddress ;

mapping(address => bool) x;

function createUser(string memory _userName, string memory _accountType) public {
    
  // _userAddress = msg.sender;
   
   require(x[msg.sender] == false, "error");
   
   //require(addresses[msg.sender] ==)
 
   //User storage user = users[_userAddress];
    // Check that the user did not already exist:
    addresses.push(msg.sender);
    x[msg.sender] = true;
   //require(!user.set);
    //Store the user
    users[msg.sender] = User({
        name: _userName,
        accountType: _accountType,
        set: true
    });
}
function returnmsg() public view returns (address){
    return msg.sender;
}
function getUserCount() public view returns(uint count){
 
 return addresses.length;
    
}
    
    event LoginAttempt(address);
    
function login() public{
//address _userAddress = msg.sender;
  User storage user = users[_userAddress];
 //  require(keccak256(abi.encodePacked(users[_userAddress].password)) == keccak256(abi.encodePacked((_password))),"Invalid password");

    require(user.set);
    emit LoginAttempt(msg.sender);
    
    
    
}
    
    
    
}


