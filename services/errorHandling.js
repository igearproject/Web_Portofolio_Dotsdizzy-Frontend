class errorHandling{
    getData(content,err){
        let message={
            status:'error',
            msg:err.message
        };
        if (err.response){
            if (err.response.status === 403) {
                message.msg=`You do not have access to ${content} data`;
            }else if(err.response.status === 401){
                message.msg=`You need to re-login`;
            }else{
                message.msg=`Request ${content} data failed`;
            }
        }
        return message
    }
}

export default new errorHandling();