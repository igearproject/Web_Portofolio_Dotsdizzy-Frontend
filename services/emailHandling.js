import http from "./httpClient";

class emailHandling{
    send(email,name,subject,emailTo,message){
        return http.post('email/send',{
            email,name,subject,emailTo,message
        });
    }

    // profile(token){
    //     return http.get('user/me',{
    //         headers:{
    //             'Authorization':token
    //         },
    //     });
    // }
}

export default new emailHandling;