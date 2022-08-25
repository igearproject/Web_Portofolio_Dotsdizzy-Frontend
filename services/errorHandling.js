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
            }else if(err.response.data?.message){
                message.msg=err.response.data.message;
            }else{
                message.msg=`Request ${content} data failed`;
            }
        }
        return message
    }

    addData(content,err){
        let message={
            status:'error',
            msg:err.message
        };
        if (err.response){
            if (err.response.status === 403) {
                message.msg=`You do not have access to add ${content}`;
            }else if(err.response.status === 401){
                message.msg=`You need to re-login`;
            }else if(err.response.status === 400 && err.response?.data?.message){
                if(typeof err.response.data.message==="object"){
                    message.msg=`<ul>`
                    err.response.data.message.map((data)=>{
                        message.msg=message.msg+`<li>${data.message}</li>`
                    });
                    message.msg=message.msg+`</ul>`
                }else{
                    message.msg=err.response.data.message;
                }
            }else{
                message.msg=`Add ${content} failed`;
            }
        }
        return message
    }

    updateData(content,err){
        let message={
            status:'error',
            msg:err.message
        };
        if (err.response){
            if (err.response.status === 403) {
                message.msg=`You do not have access to update ${content}`;
            }else if(err.response.status === 401){
                message.msg=`You need to re-login`;
            }else if(err.response.status === 400 && err.response?.data?.message){
                if(typeof err.response.data.message==="object"){
                    message.msg=`<ul>`
                    err.response.data.message.map((data)=>{
                        message.msg=message.msg+`<li>${data.message}</li>`
                    });
                    message.msg=message.msg+`</ul>`
                }else{
                    message.msg=err.response.data.message;
                }
            }else{
                message.msg=`Update ${content} failed`;
            }
        }
        return message
    }

    deleteData(content,err){
        let message={
            status:'error',
            msg:err.message
        };
        if (err.response){
            if (err.response.status === 403) {
                message.msg=`You do not have access to delete ${content}`;
            }else if(err.response.status === 401){
                message.msg=`You need to re-login`;
            }else if(err.response.status === 400 && err.response?.data?.message){
                if(typeof err.response.data.message==="object"){
                    message.msg=`<ul>`
                    err.response.data.message.map((data)=>{
                        message.msg=message.msg+`<li>${data.message}</li>`
                    });
                    message.msg=message.msg+`</ul>`
                }else{
                    message.msg=err.response.data.message;
                }
            }else{
                message.msg=`Delete ${content} failed`;
            }
        }
        return message
    }

}

export default new errorHandling();