const socket = io();

 let message = document.querySelector('.message');
 let name = document.querySelector('.name');
 let btn = document.querySelector('.send');
 let output = document.querySelector('.output');
 let typing = document.querySelector('.typing');
 let welcome = document.querySelector('.welcome');

// adding eventlistner to click  event
 btn.addEventListener('click',function(){
    console.log('here');
   socket.emit('chat',{
       message:message.value,
       name:name.value
   });
});

// displaying chat msg to chat window
   socket.on('chat',function(data){
     let d = new Date();
     let n = d.toLocaleTimeString();
       typing.innerHTML= '';
       output.innerHTML += `<li> <b>${data.name}</b>: ${data.message}<span>${n}<span> </li>`;
   })

// adding eventlistner to type  event
   message.addEventListener('keypress',()=> {
        socket.emit('typing',{
            name:name.value
        });
   });

// sending typing msg to chat window
   socket.on('typing',function(data){
    typing.innerHTML = `<p><em> ${data.name} is typing a message <em><p/>`;
   })

// adding welcome msg on chat window
   socket.on('welcome',function(data){
    welcome.innerHTML = `<p>${data}<p/>`;
   })