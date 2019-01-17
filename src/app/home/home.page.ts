import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  infos = [];
  ref = firebase.database().ref('infos/');
  constructor(public router: Router, public alertController: AlertController) {
    this.ref.on('value', resp => {
      this.infos = [];
      this.infos = snapshotToArray(resp);
    });
  }

  addInfo() {
    this.router.navigate(['/add-info']);
  }

  edit(key) {
    this.router.navigate(['/edit/' + key]);
  }

  async delete(key) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure want to delete this info?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cancel');
          }
        }, {
          text: 'Okey',
          handler: () => {
            firebase.database().ref('infos/' + key).remove();
          }
        }
      ]
    });

    await alert.present();
  }
}

export const snapshotToArray = snapshot => {
  const returnArr = [];
  snapshot.forEach(childerSnapshot => {
    const item = childerSnapshot.val();
    item.key = childerSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};
