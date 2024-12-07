import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  red_team_name: any;
  blue_team_name: any;

  red_sets_number = 0;
  blue_sets_number = 0;
  red = 0;
  blue = 0;

  ngOnInit() {
    // Intentamos recuperar los datos del localStorage
    const storedRedTeamName = localStorage.getItem('red_team_name');
    const storedBlueTeamName = localStorage.getItem('blue_team_name');
    const storedRedSetsNumber = localStorage.getItem('red_sets_number');
    const storedBlueSetsNumber = localStorage.getItem('blue_sets_number');
    const storedRedPoints = localStorage.getItem('red');
    const storedBluePoints = localStorage.getItem('blue');

    // Si ya hay datos almacenados, los cargamos
    if (storedRedTeamName && storedBlueTeamName) {
      this.red_team_name = storedRedTeamName;
      this.blue_team_name = storedBlueTeamName;
      this.red_sets_number = +storedRedSetsNumber!;  // Convertimos a número
      this.blue_sets_number = +storedBlueSetsNumber!;
      this.red = +storedRedPoints!;
      this.blue = +storedBluePoints!;
    }

    // Si no hay nombres de equipos almacenados, pedimos los nombres
    if (this.red_team_name == undefined) {
      Swal.fire({
        title: 'Escribe el nombre de los equipos!',
        heightAuto: false,
        text: 'Ingrese nombre de equipo rojo',
        icon: 'info',
        customClass: {
          popup: 'my-custom-popup',
        },
        confirmButtonText: 'Aceptar',
        showCancelButton: false,
        html: `
          <input id="equipoRojo" class="swal2-input" type="text" placeholder="Ingresa nombre equipo rojo">
          <input id="equipoAzul" class="swal2-input" type="text" placeholder="Ingresa nombre equipo azul">
        `,
        preConfirm: () => {
          const redTeamName = (document.getElementById('equipoRojo') as HTMLInputElement).value;
          const blueTeamName = (document.getElementById('equipoAzul') as HTMLInputElement).value;

          if (!redTeamName || !blueTeamName) {
            Swal.showValidationMessage('Por favor ingrese ambos nombres de equipo');
          }

          return { redTeamName, blueTeamName };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.red_team_name = result.value.redTeamName;
          this.blue_team_name = result.value.blueTeamName;

          // Guardamos los nombres de los equipos en localStorage
          localStorage.setItem('red_team_name', this.red_team_name);
          localStorage.setItem('blue_team_name', this.blue_team_name);
        }
      });
    }
  }

  constructor() { }

  up_red_points() {
    this.red++;
    console.log(`points ${this.blue} ${this.red}`);
    // Guardamos los puntos en localStorage
    localStorage.setItem('red', this.red.toString());
  }

  up_blue_points() {
    this.blue++;
    console.log(`points ${this.blue} ${this.red}`);
    // Guardamos los puntos en localStorage
    localStorage.setItem('blue', this.blue.toString());
  }

  down_red_points() {
    if (this.red == 0) {
      window.alert('No es posible puntuaciones negativas');
    } else {
      this.red--;
      // Guardamos los puntos en localStorage
      localStorage.setItem('red', this.red.toString());
    }

    console.log(`points ${this.blue} ${this.red}`);
  }

  down_blue_points() {
    if (this.blue == 0) {
      window.alert('No es posible puntuaciones negativas');
    } else {
      this.blue--;
      // Guardamos los puntos en localStorage
      localStorage.setItem('blue', this.blue.toString());
    }
  }

  red_sets() {
    this.red_sets_number++;
    // Guardamos los sets en localStorage
    localStorage.setItem('red_sets_number', this.red_sets_number.toString());
  }

  blue_sets() {
    this.blue_sets_number++;
    // Guardamos los sets en localStorage
    localStorage.setItem('blue_sets_number', this.blue_sets_number.toString());
  }

  exchange() {
    let temp = this.blue_team_name;
    let set_temp = this.blue_sets_number;
    this.blue_team_name = this.red_team_name;
    this.red_team_name = temp;

    this.blue_sets_number = this.red_sets_number;
    this.red_sets_number = set_temp;

    // Guardamos el intercambio en localStorage
    localStorage.setItem('red_team_name', this.red_team_name);
    localStorage.setItem('blue_team_name', this.blue_team_name);
    localStorage.setItem('red_sets_number', this.red_sets_number.toString());
    localStorage.setItem('blue_sets_number', this.blue_sets_number.toString());
  }

  finish_game() {
    Swal.fire({
      title: "Deseas finalizar el juego?",
      icon: "question",
      iconHtml: "?",
      heightAuto: false,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`${this.red}  ${this.blue}`)
        if (this.red_sets_number > this.blue_sets_number) {
          Swal.fire({
            title: `${this.red_team_name} Es el equipo ganador!`,
            text: "Felicidades",
            heightAuto: false,
            icon: "success"
          });
        } else {
          Swal.fire({
            title: `${this.blue_team_name} Es el equipo ganador!`,
            text: "Felicidades",
            heightAuto: false,
            icon: "success"
          });
        }



        localStorage.clear();
        setTimeout(() => {
          // Acción después de 5 segundos
          location.reload();
        }, 3500);
        

      } else if (result.isDismissed) {
        // Si el usuario hace clic en "No" o cierra el modal
        console.log("El set no ha sido finalizado");
        // Aquí puedes agregar lo que quieras hacer si se cancela
      }
    });
  }

  finish_set() {
    Swal.fire({
      title: "Deseas finalizar el set?",
      icon: "question",
      iconHtml: "?",
      heightAuto: false,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.red > this.blue) {
          Swal.fire({
            title: `${this.red_team_name} Es el equipo ganador del set!`,
            text: "You clicked the button!",
            heightAuto: false,
            icon: "success"
          });
          this.red_sets_number++
        } else {
          Swal.fire({
            title: `${this.blue_team_name} Es el equipo ganador del set!`,
            text: "Felicidades",
            heightAuto: false,
            icon: "success"
          });
          this.blue_sets_number++
        }
        this.red = 0
        localStorage.setItem('red', this.red.toString());
        this.blue = 0
        localStorage.setItem('blue', this.blue.toString());
        localStorage
      } else if (result.isDismissed) {
        // Si el usuario hace clic en "No" o cierra el modal
        console.log("El set no ha sido finalizado");
        // Aquí puedes agregar lo que quieras hacer si se cancela
      }
    });

  }
}
