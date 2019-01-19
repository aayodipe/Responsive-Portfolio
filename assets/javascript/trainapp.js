$(document).ready(function () {
     //Initialize Firebase
     var config = {
          apiKey: "AIzaSyAY5gwnrVbokOMDTLedvL1YCnA_RKdtwkA",
          authDomain: "fr-demo-app-2.firebaseapp.com",
          databaseURL: "https://fr-demo-app-2.firebaseio.com",
          projectId: "fr-demo-app-2",
          storageBucket: "fr-demo-app-2.appspot.com",
          messagingSenderId: "1029611183819"
     };
     // Initialize Firebase
     firebase.initializeApp(config);

     // Create a variable to reference the database
     let database = firebase.database()

     // Button for adding New Train
     $(".submit").on("click", function (event) {
          //Prevent default behaviour of submit event
          event.preventDefault()
          // grab user Input
          let trainName = $("#train-name").val().trim()
          let destination = $("#destination").val().trim()
          let trainFirstTime = $("#train-time").val().trim()
          let frequency = $("#frequency").val().trim()
          
          
         
          console.log(trainName, destination, trainFirstTime, frequency)

                    let trainData = {
                         Train_Name: trainName,
                         Destination: destination,
                         Frequency: frequency,
                         TrainFirstTime:trainFirstTime
                    
                    }

                    // Uploads employee data to the database
                    database.ref().push(trainData)

                    //clear the input field
                    $("#train-name").val("")
                    $("#destination").val("")
                    $("#train-time").val("")
                    $("#frequency").val("")
               })

     database.ref().on("child_added", function (snapshot) {
        //set the snapshot to sv
               var sv= snapshot.val();
           //test 
               console.log(sv);
               console.log(sv.Train_Name);
               console.log(sv.Destination);
               console.log(sv.firstTrain);
               console.log(sv.Frequency)
            
            
            //Assign Friquency to sv.frequency
               tFrequency = sv.Frequency
            
               firstTrain = sv.TrainFirstTime
            
               console.log(tFrequency, firstTrain);
            
               var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
               console.log(firstTimeConverted);
            
               var currentTime = moment();
               console.log("Current Time " + moment(currentTime).format("HH:mm"));
            
               var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
               console.log(diffTime);
            
               var tRemainder = diffTime % tFrequency;
               console.log(tRemainder);
            
               var tMinutesTillTrain = tFrequency - tRemainder;
               console.log("Minutes until next train " + tMinutesTillTrain);
      
               var nextTrain = moment().add(tMinutesTillTrain, "minutes");
              
               var nextArrival = moment(nextTrain).format("HH:mm");

               //Populae to HTML
               let tr = $("<tr>").addClass("table-tr").append(
                    $("<td>").text(sv.Train_Name),
                    $("<td>").text(sv.Destination),
                    $("<td>").text(sv.Frequency),                    
                    $("<td>").text(nextArrival),
                    $("<td>").text(tMinutesTillTrain),
                    $("<button>").text("x").addClass("delete-button")
                   )
                    tr.appendTo("tbody")
                     // Handle the errors
               }, function(errorObject) {
                    console.log("Errors handled: " + errorObject.code);
     })    
            
          
         $(".delete-button").on("click",function(){
         
               $(this).remove();
          
          
         })
})