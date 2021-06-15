var groupecontroller=require ('../../controllers/groupe.controllers')
var authmidllwares=require ('../../midllwares/auth/authmidllwares')


const initalizegrouperoute=(app)=>{
    app.get("/groupe/getgroupe",[authmidllwares,groupecontroller.getById])
   app.get ("groupes",[authmidllwares,groupecontroller.list] )
}
module.exports=initalizegrouperoute