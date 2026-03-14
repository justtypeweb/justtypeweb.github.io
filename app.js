const firebaseConfig = {
 apiKey: "AIzaSyADR4IeYV2RisrwnNpnMHPAlohG2TMvTdw",
 authDomain: "justtypeweb-3c2dd.firebaseapp.com",
 projectId: "justtypeweb-3c2dd",
 storageBucket: "justtypeweb-3c2dd.firebasestorage.app",
 messagingSenderId: "138859919367",
 appId: "1:138859919367:web:ad1650ab107422d6ffd2a2"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

let user = null;
let username = null;

const loginBtn = document.getElementById("loginBtn");

loginBtn.onclick = () => {

const provider = new firebase.auth.GoogleAuthProvider();

auth.signInWithPopup(provider);

};


auth.onAuthStateChanged(async u => {

if(!u) return;

user = u;

let doc = await db.collection("users").doc(user.uid).get();

if(doc.exists){

username = doc.data().username;

}else{

document.getElementById("usernameBox").style.display="block";

}

});


document.getElementById("saveUsername").onclick = async () => {

let name = document.getElementById("usernameInput").value;

if(name.length <3){

alert("Username too short");

return;

}

let check = await db.collection("users")
.where("username","==",name)
.get();

if(!check.empty){

alert("Username already taken");

return;

}

await db.collection("users").doc(user.uid).set({

username:name

});

username=name;

document.getElementById("usernameBox").style.display="none";

};


document.getElementById("postBtn").onclick = async () => {

if(!username){

alert("Create username first");

return;

}

let text = document.getElementById("postText").value;

if(text.length <1) return;

await db.collection("posts").add({

username:username,
text:text,
date:Date.now()

});

document.getElementById("postText").value="";

};


db.collection("posts")
.orderBy("date","desc")
.onSnapshot(snapshot=>{

let html="";

snapshot.forEach(doc=>{

let data = doc.data();

html += `
<div class="post">
<b>${data.username}</b>
<p>${data.text}</p>
</div>
`;

});

document.getElementById("posts").innerHTML = html;

});