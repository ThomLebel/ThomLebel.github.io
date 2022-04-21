function sendMail(){
    if(validateForm()) {
        console.log("send MAIL !");
        emailjs.sendForm('service_zi8jsns', 'template_6ii20md', '#myForm')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
    }
    return false;
}

function validateForm()                                    
{ 
    var name = document.forms["myForm"]["name"];               
    var email = document.forms["myForm"]["email"];    
    var subject = document.forms["myForm"]["subject"];    
    var message = document.forms["myForm"]["message"];   
   
    if (name.value == "")                                  
    { 
        document.getElementById('errorname').innerHTML="Please enter a valid name";  
        name.focus(); 
        return false; 
    }else{
        document.getElementById('errorname').innerHTML="";  
    }
       
    if (email.value == "")                                   
    { 
        document.getElementById('erroremail').innerHTML="Please enter a valid email address"; 
        email.focus(); 
        return false; 
    }else{
        document.getElementById('erroremail').innerHTML="";  
    }
   
    if (email.value.indexOf("@", 0) < 0)                 
    { 
        document.getElementById('erroremail').innerHTML="Please enter a valid email address"; 
        email.focus(); 
        return false; 
    } 
   
    if (email.value.indexOf(".", 0) < 0)                 
    { 
        document.getElementById('erroremail').innerHTML="Please enter a valid email address"; 
        email.focus(); 
        return false; 
    } 

    if (subject.value == "")                                  
    { 
        document.getElementById('errorsubject').innerHTML="Please enter a valid subject";  
        subject.focus(); 
        return false; 
    }else{
        document.getElementById('errorsubject').innerHTML="";  
    }
   
    if (message.value == "")                           
    {
        document.getElementById('errormsg').innerHTML="Please enter a valid message"; 
        message.focus(); 
        return false; 
    }else{
        document.getElementById('errormsg').innerHTML="";  
    }
   
    return true; 
}