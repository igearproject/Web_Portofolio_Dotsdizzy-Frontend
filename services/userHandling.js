import http from "./httpClient";
import getToken from "./getToken";

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

    async profileV2(){
        const token=await getToken.new();

        return http.get('user/me',{
            headers:{
                'Authorization':token
            },
        });
    }

    async updateProfile(data){
        const token=await getToken.new();
        // console.log(data.name);
        return http.put(`user/${data._id}`,{
            name:data.name,
        },{
            headers:{
                'Authorization':token
            },
        });
    }

    async changePassword({_id,oldPassword,password,rePassword}){
        const token=await getToken.new();
        return http.put(`user/${_id}/change-password`,{
            oldPassword:oldPassword,
            password:password,
            rePassword:rePassword,
        },{
            headers:{
                'Authorization':token
            },
        });
    }

    async logout(){
        const token=await getToken.new();
        return http.delete(`user/logout`,{
            headers:{
                'Authorization':token
            },
        });
    }
}

export default new userHandling;