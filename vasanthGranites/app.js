//Unique Firebase Object
var firebaseConfig = {
  apiKey: "AIzaSyAy9rumiwzjSf5bE6_CUqIBztyqgnEUR3E",
  authDomain: "vasanth-granites-9d57d.firebaseapp.com",
  projectId: "vasanth-granites-9d57d",
  storageBucket: "vasanth-granites-9d57d.appspot.com",
  messagingSenderId: "102388171645",
  appId: "1:102388171645:web:c46497dc07ba9c4cb8c214"
};


//Initialize Firebase 
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore()

//Variable to access database collection
const db = firestore.collection("ContactForm")

//Get Submit Form
let submitButton = document.getElementById('submit')

//Create Event Listener To Allow Form Submission
submitButton.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault()

  //Get Form Values
  let name = document.getElementById('name').value
  let phone = document.getElementById('phone').value
  let message = document.getElementById('message').value

  //Save Form Data To Firebase
  db.doc().set({
    name: name,
    phone: phone,
    message: message
  }).then( () => {
    console.log("Data saved")
  }).catch((error) => {
    console.log(error)
  })

  //alert
  alert("Your Form Has Been Submitted Successfully!")
})