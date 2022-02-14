const path = require('path')
const { v4: uuidv4 } = require('uuid');

const upFile = (files, validExtensions = ['png','jpg'], folder = '') =>{
    return new Promise((resolve, reject)=>{

        try{
            const {file} = files;
            const nameShor = file.name.split('.')
            const extension = nameShor[nameShor.length-1]
            //extentions valid
            if(!validExtensions.includes(extension)) return reject(`the extention ${extension} isnt permit, ${validExtensions}`)

            const tempName = uuidv4() + '.' + extension
            const uploadPath = path.join(__dirname , '../uploads/' , folder, tempName);

            file.mv(uploadPath, function(err) {
                if (err) {
                    reject(err)
                }
                resolve(tempName)
            });
        }catch{
            reject('Por favor ingresar archivo')
        }

    })
    
}

module.exports = {
    upFile
}