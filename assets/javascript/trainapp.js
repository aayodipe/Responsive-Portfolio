$(document).ready(function(){
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
let OregonTimer = startTime+3600


console.log(startTime)

$(".submit").on("click", function (event) {
  //Prevent default behaviour of submit event
     event.preventDefault()
   
     let trainName = $("#train-name").val().trim()
     let destination = $("#destination").val().trim()
     let trainTime = $("#train-time").val().trim()
     let frequency = $("#frequency").val().trim()
 

     console.log(trainName, destination, trainTime, frequency)


     database.ref().push({
          Train_Name: trainName,
          Destination: destination,
          Train_Time: trainTime,
          Frequency: frequency,
        
     })

 

database.ref().on("child_added", function (snapshot) {
     console.log(snapshot.val());

     let tr = $('<tr>')
     let nameCell = $("<td>").text(snapshot.val().Train_Name)
     nameCell.appendTo(tr)
     tr.appendTo("tbody")
     let destinationCell = $("<td>").text(snapshot.val().Destination)
     destinationCell.appendTo(tr)
    
     let frequencyCell = $("<td>").text(snapshot.val().Frequency)
     frequencyCell.appendTo(tr)
    
     let trainTimeCell = $("<td>").text(snapshot.val().Train_Time)
     trainTimeCell.appendTo(tr)
     
     





})
})
})