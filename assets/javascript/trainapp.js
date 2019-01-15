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

     //timing
     let startTime = moment().format("hh:mm");
     let trentonTimer = moment().add(1000000, 'milliseconds')
     let OregonTimer = startTime + 3600


     console.log(startTime)



     // Button for adding New Train
     $(".submit").on("click", function (event) {
          //Prevent default behaviour of submit event
          event.preventDefault()
          // grab user Input
          let trainName = $("#train-name").val().trim()
          let destination = $("#destination").val().trim()
          let trainTime = $("#train-time").val().trim()
          let frequency = $("#frequency").val().trim()


          console.log(trainName, destination, trainTime, frequency)

          let trainData = {
               Train_Name: trainName,
               Destination: destination,
               Train_Time: trainTime,
               Frequency: frequency,

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
         let tTime = snapshot.val().Train_Time

         let tr = $("<tr>").append(
          $("<td>").text(tName),
          $("<td>").text(tDestination),
          $("<td>").text(tFrequency),
          $("<td>").text(tTime)
         )
          tr.appendTo("tbody")
           // Handle the errors
     }, function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
        });
    
})