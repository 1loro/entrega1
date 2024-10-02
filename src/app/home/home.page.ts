import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 
import { AuthenticatorService } from './../Servicios/authenticator.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor(private router: Router, private alertController: AlertController,  private auth: AuthenticatorService) {} 

  user = {
    username: '',
    password: '',
  };
  mensaje = '';


  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Campos incompletos',
      message: mensaje,
      buttons: ['OK'],
      cssClass: 'custom-alert'  
    });

    await alert.present();
  }

  validar() {
    if (this.user.username.length === 0) { // Verifica si el campo de usuario está vacío
      this.mensaje = 'Usuario vacío';
      this.mostrarAlerta('Por favor, ingrese su usuario');
      return; // Salir de la función
    }

    if (this.user.password.length === 0) { // Verifica si el campo de contraseña está vacío
      this.mensaje = 'Contraseña vacía';
      this.mostrarAlerta('Por favor, ingrese su contraseña');
      return; // Salir de la función
    }

    if (this.auth.login(this.user.username, this.user.password)) { // Verifica las credenciales
      this.mensaje = '';
      let navigationExtras: NavigationExtras = {
        state: {
          username: this.user.username,
          password: this.user.password,
        },
      };
      this.router.navigate(['/perfil'], navigationExtras);
    } else {
      console.log('Credenciales erróneas');
      this.mensaje = 'Credenciales erróneas';
      this.mostrarAlerta('Credenciales erróneas');
    }
  }
}
