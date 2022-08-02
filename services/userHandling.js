import http from "./httpClient";

class userHandling{
    login(email,password){
        return http.post('user/login',{
            email,password
        });
    }

    profile(token){
        return http.get('user/me',{
            headers:{
                'Authorization':token
            },
        });
    }
}

export default new userHandling;