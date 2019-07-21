App = {
  web3Provider: null,
  contracts: {},

 init: function(){
   return App.initWeb3();
 },

  initWeb3: async function() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Project.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var ProjectArtifact = data;
      App.contracts.Project = TruffleContract(ProjectArtifact);
    
      // Set the provider for our contract
      App.contracts.Project.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
    //  return App.userCreation()
    return App.bindEvents();
    });

    
  },

  bindEvents: function() {
    $("#Button").click(function(){

      App.contracts.Project.deployed().then(function(instance) {

      return instance.createUser($("#UserName").val(), $("#select").val(), { gas:  6721975});
   
    }).then(function(User) {
      
        
      
    }).catch(function(err) {
      console.log(err.message);
    });
  });
},


   
  

  /* userCreation: function(adopters, account) {
    var ProjectInstance;

App.contracts.Project.deployed().then(function(instance) {
  adoptionInstance = instance;

  return ProjectInstance.createUse.call();
}).then(function(adopters) {
  for (i = 0; i < adopters.length; i++) {
    if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
      $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
    }
  }
}).catch(function(err) {
  console.log(err.message);
});

  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    
  } */

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
