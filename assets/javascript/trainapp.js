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
      // Store everything into a variable.
      let tName = snapshot.val().Train_Name
      let tDestination = snapshot.val().Destination
      let tFrequency = snapshot.val().Frequency
   
    
    // First train time
    let firstTime = snapshot.val().TrainFirstTime
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
   
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log( "DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
 
                   


                   let tr = $("<tr>").append(
                    $("<td>").text(tName),
                    $("<td>").text(tDestination),
                    $("<td>").text(tFrequency),
                    $("<td>").text(tMinutesTillTrain),
                    $("<td>").text(nextTrain),
                    $("<button>").text("x").addClass("delete-button")
                   )
                    tr.appendTo("tbody")
                     // Handle the errors
               }, function(errorObject) {
                    console.log("Errors handled: " + errorObject.code);
     });
     //     $(".delete-button").on("click",function(){
     //          $(this).empty("tr")
     //     })
})