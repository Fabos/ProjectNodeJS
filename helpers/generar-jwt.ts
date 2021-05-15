import jwt from 'jsonwebtoken';


const generarJWT = (uid:string)=>{

    return new Promise((resolve, reject)=>{
        console.log("=================");
        console.log(uid);
        console.log("=================");
        

        const payload = {uid};
        console.log("=================");
        console.log(process.env.SECRETORPRIVATEKEY);
        console.log("=================");
        
        
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY!, {
            expiresIn: '4h'
        },(err, token)=>{
            if (err) {
                console.log(err);
                reject("No se pudo generar el token");
            }else{
                resolve(token);
            }
        });
    });
}


export default generarJWT;