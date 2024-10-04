import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/Servicios/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {
    username: "",
    email: "",
    password: ""
  } 
  constructor(
    private alertController: AlertController, 
    private toastController: ToastController,
    private storage: StorageService, 
    private router: Router
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

  registrar() {
    console.log(this.user)
    this.storage.set(this.user.username, this.user);
    this.router.navigate(['/home'])
  }
}
