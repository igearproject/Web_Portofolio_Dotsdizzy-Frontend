import Image from 'next/image';

const Thumbnail = ({images}) => {
    let img,thub;
    thub=0
    images.map((data)=>{
        // if(data._id.thumbnail===true){
        if(data.thumbnail===true){
            thub=1;
            // img=data._id;
            img=data;
        }
    });
    if(thub===0&&images.length>0){
        // img=images[0]._id;
        img=images[0];
    }
    if(img){
        return (
            <>
                <Image 
                    src={img.cdnUrl||process.env.NEXT_PUBLIC_SERVER_URL_IMAGE+img.fileName} 
                    width="250px" height="250px" 
                    key={img.fileName}
                    className="card-img-top"
                />
            </>
        )
    }
    
}

export default Thumbnail