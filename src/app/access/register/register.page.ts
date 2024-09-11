import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nombreUsuario = ''; 
  correo = '';       
  contrasena = '';  
  constructor(
    private alertController: AlertController, 
    private toastController: ToastController,
  ) {}

  ngOnInit() {}

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, 
      position: 'bottom', 
    });
    await toast.present();
  }

  async registrar() {
    if (this.nombreUsuario.trim() === '') {
      this.mostrarAlerta('Por favor, ingrese un nombre de usuario');
    } else if (this.correo.trim() === '') {
      this.mostrarAlerta('Por favor, ingrese un correo electrónico');
    } else if (this.contrasena.trim() === '') {
      this.mostrarAlerta('Por favor, ingrese una contraseña');
    } else {
      
      this.mostrarToast('Usuario registrado con éxito');
      
    }
  }
}
