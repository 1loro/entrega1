import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor(private router: Router, private alertController: AlertController) {} 

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
    if (this.user.username.length != 0) {
      if (this.user.password.length != 0) {
        
        this.mensaje = '';
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
            password: this.user.password,
          },
        };
        this.router.navigate(['/perfil'], navigationExtras).then(() => {
          
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      } else {
        
        
        this.mensaje = 'Contraseña vacia';
        this.mostrarAlerta('Por favor, ingrese su contraseña');
      }
    } else {
      
      
      this.mensaje = 'Usuario vacio';
      this.mostrarAlerta('Por favor, ingrese su usuario');
    }
  }
}
