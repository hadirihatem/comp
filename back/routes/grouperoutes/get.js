var groupecontroller=require ('../../controllers/groupe.controllers')
var authmidllwares=require ('../../midllwares/auth/authmidllwares')


const initalizegrouperoute=(app)=>{
    app.get("/groupe/getgroupe",[authmidllwares,groupecontroller.getById])
   
}
module.exports=initalizegrouperoute