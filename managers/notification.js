(function(notification){
    const FCM = require('fcm-node');
    const serverKey = 'AAAA5Kzyt7o:APA91bF5XXoCqBG5kHZ_XqnJ_lJ6XS43iIkmU0CupYVqFXj78u47pN_T8TeE7eBsSi72JKxX4JvAsRr6Cw4ON6RI686Ryx9e5drW-0cHKB-Cgn629qPglIfrLmS9ujjIpsovRBrbCl5k';
    const fcm = new FCM(serverKey);
    
    notification.notify = function(token,msg){
        var message = {
            to: token, 
            collapse_key: '',
            
            notification: {
                title: msg.title, 
                body: msg.body 
            },
            
            data: {  //you can send only notification or only data(or include both)
                my_key: 'my value',
                my_another_key: 'my another value'
            }
        };
        // for(var i=0;i<token.length;i++){
            fcm.send(message, function(err, response){
                if (err) {
                    console.log("Something has gone wrong!");
                } else {
                    console.log("Successfully sent with response: ");
                }
            });
        // }
  }  
})(module.exports)