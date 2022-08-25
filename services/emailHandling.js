import http from "./httpClient";
import getToken from "./getToken";

class emailHandling{
    send(email,name,subject,emailTo,message){
        return http.post('email/send',{
            email,name,subject,emailTo,message
        });
    }

    async getAll(option){
        const token=await getToken.new();
        return http.get(`email?page=${option.page}&limit=${option.limit}&searchKey=${option.searchKey}`,{
            headers:{
                'Authorization':token
            },
        });
    }
    async deleteOne(id){
        const token=await getToken.new();
        return http.delete(`email/${id}`,{
            headers:{
                'Authorization':token
            },
        });
    }
}

export default new emailHandling;