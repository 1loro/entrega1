import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController, AnimationController } from '@ionic/angular';
import { AuthenticatorService } from './../../Servicios/authenticator.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit, AfterViewInit {
  @ViewChild('logoImg', { static: false }) logoImg!: ElementRef<HTMLIonImgElement>;
  username = '';
  ubicacionActual = '';
  destino = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private animationController: AnimationController,
    private auth: AuthenticatorService
  ) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: string;
    };
    this.username = state?.username || '';
  }

  ngOnInit() {}

  ngAfterViewInit() {
    console.log('Gengar cargado', this.logoImg);
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async mostrarToast() {
    const toast = await this.toastController.create({
      message: `Buscando viaje desde ${this.ubicacionActual} a ${this.destino}`,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

   buscarViajes() {
    if (this.ubicacionActual.length === 0) {
      this.mostrarAlerta('Por favor, ingrese su ubicación actual');
    } else if (this.destino.length === 0) {
      this.mostrarAlerta('Por favor, ingrese su destino');
    } else {
      this.mostrarToast();
     this.animarLogo();
    }
  }

//malditos logs para ver donde esta el error  
  async animarLogo() {
    const element = document.querySelector('ion-img.logo') as HTMLIonImgElement;
    if (!element) {
      console.error('no se encontro al maldito gengar');
      return;
    }

    console.log('Gengar Gotcha!:', element);

    const animationA = this.animationController
      .create()
      .addElement(element)
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0)', 'translateX(-100%)')
      .fromTo('opacity', '1', '0');

    await animationA.play();

    console.log('Gengar se fue');

    const animationReset = this.animationController
      .create()
      .addElement(element)
      .duration(0)
      .fromTo('transform', 'translateX(-200%)', 'translateX(200%)');

    await animationReset.play();

    console.log('Gengar volvio');

    const animationB = this.animationController
      .create()
      .addElement(element)
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(200%)', 'translateX(0)')
      .fromTo('opacity', '0', '1');

    await animationB.play();

    console.log('Gengar hizo todo lo que tenia que hacer:3');
  }

  logout() {
    this.auth.logout(); 
    this.router.navigate(['/home']); 
  }
}