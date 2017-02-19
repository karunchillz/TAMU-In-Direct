// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionicApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && 
       window.cordova.plugins && //wayne: added due to https://github.com/driftyco/ng-cordova/issues/1028
       window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if (window.ezar) {
      ezar.initializeVideoOverlay(
        function() {
          ezar.getBackCamera().start();
        },
	  		function(err) {
	  			alert('unable to init ezar: ' + err);
	  		});	  
    }
  });
})

.controller("AppController", function($scope, $timeout) {
  $scope.data = {
    speechText: ''
  };
  $scope.recognizedText = '';
  $scope.dest = '';
  $scope.dictate = '';

  $scope.displayAddressInput = function(){
    document.getElementById('display-markers').className = 'hide';    
    document.getElementById('address-typer').className = '';
    document.getElementById('address-speaker').className = 'hide';
    document.getElementById('emergency').className = 'hide';
    document.getElementById('display-reached').className = 'hide';
    document.getElementById('display-words').className = 'hide';
  };

  $scope.displaySpeakerPhone = function(){
    document.getElementById('display-markers').className = 'hide';    
    document.getElementById('address-typer').className = 'hide';
    document.getElementById('address-speaker').className = '';
    document.getElementById('emergency').className = 'hide';
    document.getElementById('display-reached').className = 'hide';
    document.getElementById('display-words').className = 'hide';
    var recognition = new SpeechRecognition();
    recognition.onresult = function(event) {
        if (event.results.length > 0) {
            $scope.recognizedText = event.results[0][0].transcript;
            $scope.$apply();
            updateMarkers($scope.recognizedText);    
        }
    };
    speakText('Where do you want to go ?', 1);    
  };

  $scope.displayMap = function(){
    document.getElementById('display-markers').className = 'hide';
    document.getElementById('address-typer').className = 'hide';
    document.getElementById('address-speaker').className = 'hide';
    document.getElementById('emergency').className = 'blink_me';
    document.getElementById('display-reached').className = 'hide';
    document.getElementById('display-words').className = 'hide';
  };
 
  $scope.displayMarkers = function() {
    document.getElementById('display-markers').className = '';
    document.getElementById('address-typer').className = 'hide';
    document.getElementById('address-speaker').className = 'hide';
    document.getElementById('emergency').className = 'hide';
    document.getElementById('display-reached').className = 'hide';
    document.getElementById('display-words').className = 'hide';
    updateMarkers($scope.data.speechText);
  };

  $scope.displayEmergency = function() {
    document.getElementById('display-markers').className = '';
    document.getElementById('address-typer').className = 'hide';
    document.getElementById('address-speaker').className = 'hide';
    document.getElementById('emergency').className = 'hide';
    document.getElementById('display-reached').className = 'hide';
    document.getElementById('display-words').className = 'hide';
    updateMarkers('emergency');
  };  

  function updateMarkers(dest){
    if(dest == '217'){
      $scope.dest = 'Room 217';     
      $timeout(function(){
        document.getElementById('first-arrow').className = 'arrow-left';
        document.getElementById('second-arrow').className = 'arrow-left';
        document.getElementById('third-arrow').className = 'arrow-left';
        $timeout(function(){
          document.getElementById('first-arrow').className = 'arrow-up';
          document.getElementById('second-arrow').className = 'arrow-up';
          document.getElementById('third-arrow').className = 'arrow-up';
          $timeout(function(){
            document.getElementById('display-markers').className = 'hide';
            document.getElementById('display-reached').className = '';
          },2000);        
        },3000);        
      },10000);
    }else if(dest == 'Office of Student Services'){
      $scope.dest = 'Office of Student Services';
      document.getElementById('address-speaker').className = 'hide';
      document.getElementById('display-words').className = '';
      $scope.dictate = 'Straight';
      speakText('Ok, I will help you get there. Go Straight for 50 feet', 1);
      $timeout(function(){
        speakText('Steps to the next floor on the right, but we need to take a left', 1);
        $timeout(function(){
          $scope.dictate = 'Left';
          speakText('Take a left now', 1);
          $timeout(function(){
            $scope.dictate = 'Straight';
            speakText('Office of the Dean is on the right, but our destination is on the left', 1);
            $timeout(function(){
              $scope.dictate = 'Left';
              speakText('Take a left and you have reached your detination', 1);
              document.getElementById('display-markers').className = 'hide';
              document.getElementById('display-reached').className = '';
            },5000);          
          },5000);        
        },10000);        
      },10000);
    }else if(dest == 'safe rest room'){
      $scope.dest = 'Side Rest Room';
      $timeout(function(){
        document.getElementById('first-arrow').className = 'arrow-right';
        document.getElementById('second-arrow').className = 'arrow-right';
        document.getElementById('third-arrow').className = 'arrow-right';
        $timeout(function(){
          document.getElementById('first-arrow').className = 'arrow-up';
          document.getElementById('second-arrow').className = 'arrow-up';
          document.getElementById('third-arrow').className = 'arrow-up';
         $timeout(function(){
            document.getElementById('first-arrow').className = 'arrow-left';
            document.getElementById('second-arrow').className = 'arrow-left';
            document.getElementById('third-arrow').className = 'arrow-left';   
            $timeout(function(){
              document.getElementById('first-arrow').className = 'arrow-up';
              document.getElementById('second-arrow').className = 'arrow-up';
              document.getElementById('third-arrow').className = 'arrow-up';
              $timeout(function(){
                document.getElementById('display-markers').className = 'hide';
                document.getElementById('display-reached').className = ''; 
              },2000);             
            },2000);              
          },3000);             
        },3000);
      },20000);
    }else if(dest == 'emergency'){
      $scope.dest = 'Emergency Exit';
     $timeout(function(){
        document.getElementById('first-arrow').className = 'arrow-left';
        document.getElementById('second-arrow').className = 'arrow-left';
        document.getElementById('third-arrow').className = 'arrow-left';
        $timeout(function(){
          document.getElementById('first-arrow').className = 'arrow-up';
          document.getElementById('second-arrow').className = 'arrow-up';
          document.getElementById('third-arrow').className = 'arrow-up';
          $timeout(function(){
            document.getElementById('display-markers').className = 'hide';
            document.getElementById('display-reached').className = '';
          },20000);        
        },2000);        
      },2000);      
    }
  }

  function speakText(textValue, speed){
    TTS.speak({
         text: textValue,
         locale: 'en-US',
         rate: speed
     }, function () {
     }, function (reason) {
     });    
  }

  $scope.record = function(){
      $scope.recognizedText = 'Office of Student Services';
      updateMarkers('Office of Student Services');    
  };
});
