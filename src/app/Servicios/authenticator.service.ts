import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  //Generamos una variable boolean para rectificar el actual estado de conexion con el autentificador
  connnectionStatus: boolean;

  // Inyectar el Router en el constructor
  constructor(private storage: StorageService, private router: Router) {
    this.connnectionStatus = false;
  }
  loginBDD(user: string, pass: String): Promise<boolean> {
    return this.storage.get(user).then((val) => {
      if (val.password === pass) {
        console.log("usuario encontrado");
        // Definir navigationExtras aquí
        let navigationExtras: NavigationExtras = {
          state: {
            username: user,
            password: pass,
          },
        };
        this.router.navigate(['/perfil'], navigationExtras); // Usar navigationExtras aquí
        this.connnectionStatus = true;
        return true; // Retornar true si las credenciales son correctas
      } else {
        console.log("error pass");
        return false; // Retornar false si las credenciales son incorrectas
      }
    }).catch((error) => {
      console.log("Error credenciales");
      this.connnectionStatus = false;
      return false; // Retornar false en caso de error
    });
  }


  //Logout para desconectar del sistema 
  logout() {
    this.connnectionStatus = false;
  }
  //Funcion para consultar el estado de conexion
  isConected() {
    return this.connnectionStatus;
  }
}