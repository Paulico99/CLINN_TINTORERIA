import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AutenticacionService {
  //user = firebase.auth().currentUser;
  
  
registroUsuario(userdata){
  firebase.auth().createUserWithEmailAndPassword(userdata.email,userdata.password)
  
  .catch( error => {
    console.log(error);
  })
}

iniciosesion(userdata,){
  firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password)
  .then( res => {
    //user = firebase.auth().currentUser;    
    console.log(res);
    this.router.navigate(['/Usuarios/admin-usuario']);
  })
  .catch(
    error => {
      console.log(error);
    }
  )
}

iniciosesion2(userdata2){
  firebase.auth().signInWithEmailAndPassword(userdata2.email, userdata2.password)
  .then( res2 => {
    console.log(res2);
    this.router.navigate(['/administrador/admin-admin']);
  })
  .catch(
    error => {
      console.log(error);
    }
  )
}

isAunthenticated(){
  const user = firebase.auth().currentUser;

  if (user) {
    return true;
  }
  else{
    return false;
  }

}

isUid(){
  const user = firebase.auth().currentUser;
  var uid = user.uid;
  
  if (uid == "TiYkZooyMgZHcpsxQKnXMv612fz1") {
    return true;
  }
  else{
    return false;
  }
}

logout(){
  firebase.auth().signOut();
}
  constructor( private router: Router,
  private activatedRoute: ActivatedRoute ) {
    
  }

}
