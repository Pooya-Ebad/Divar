require("dotenv").config()
const { default: axios } = require("axios");

async function getMapAddress(lat, lng){
    return await axios.get(`${process.env.MAP_URL}?lat=${lat}&lon=${lng}`,{
        headers:{
            "x-api-key" : process.env.MAP_API_KEY
        }
      }).then(res=>{
        return {
          province: res.data.province,
          city : res.data.city,
          region : res.data.region,
          address : res.data.address
        }    
      })

}

module.exports = {
    getMapAddress
}