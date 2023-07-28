import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import database from 'firebase';
import { ref, set, get, child } from 'firebase/database';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  constructor(
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  isModalOpen: boolean = false;
  shoppingCar: Array<any> = [];
  numberSold: Array<any> = [];
  numberListResults: Array<any> = [];
  name = '';
  email = '';
  phoneNumber = '';
  purchaseCodes:Array<string>;
  code: any = '';

  ngOnInit() {
    setTimeout(()=>{
this.getPurchaseCodes().then((codes)=>{
  this.purchaseCodes=codes
})
    },5000)
    this.callNumberSold();
    this.code = this.route.snapshot.paramMap.get('code');
  }
  ionViewWillEnter() {
    this.callNumberSold();
  }

  handleRefresh(event: any) {
    this.callNumberSold();
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 1000);
  }
  callNumberSold() {
    this.getNumberSold().then((numberSold: any) => {
      this.numberSold = numberSold;
      this.numberListResults = this.numberList.filter((number) => {
        return !numberSold.some((sold: any) => sold.number === number.number);
      });
    });
  }

  async buyNumbers() {
    let purchasedNumber = this.shoppingCar.map((item) => {
      return {
        number: item.number,
        owner: {
          name: this.name,
          email: this.email,
          phoneNumber: this.phoneNumber,
        },
      };
    });
    if (this.purchaseCodes.includes(this.code)) {

    const codeAvailable=this.purchaseCodes.filter(
        (item: any) => item !== this.code
      );
      set(ref(database, `purchaseCodes`), codeAvailable);
      set(ref(database, `numbersSold`), [
        ...this.numberSold,
        ...purchasedNumber,
      ]).then(async () => {
        this.callNumberSold();
        const alert = await this.alertController.create({
          header: 'Felicidades!',
          subHeader: 'Su compra ha sido realizada con exito.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.isModalOpen = false;
                this.shoppingCar = [];
                this.code = '';
              },
            },
          ],
        });

        await alert.present();
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Lo sentimos!',
        subHeader:
          'Su código de referido es inválido, contacte con su vendedor.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.isModalOpen = false;
              this.shoppingCar = [];
              this.code = '';
            },
          },
        ],
      });

      await alert.present();
    }
  }

  getNumberSold() {
    const dbRef = ref(database);
    return get(child(dbRef, `numbersSold`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return [];
        }
      })
      .catch(() => {
        return [];
      });
  }
  getPurchaseCodes() {
    const dbRef = ref(database);
    return get(child(dbRef, `purchaseCodes`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return [];
        }
      })
      .catch(() => {
        return [];
      });
  }
  numberList = [
    {
      number: 1,
      msg: '¡Soy el número 1! Represento el comienzo y la singularidad en las matemáticas.',
    },
    {
      number: 2,
      msg: '¡Soy el número 2! ¡Dos es mejor que uno! También soy el único número par y el único primo que es par.',
    },
    {
      number: 3,
      msg: '¡Soy el número 3! Soy el primer número impar y uno de los números primos más pequeños.',
    },
    {
      number: 4,
      msg: '¡Soy el número 4! Soy el primer número cuadrado y también la base de muchos sistemas de numeración.',
    },
    {
      number: 5,
      msg: '¡Soy el número 5! Un número primo que marca la mitad de los dedos en una mano.',
    },
    {
      number: 6,
      msg: '¡Soy el número 6! Soy el primer número perfecto, ya que la suma de mis divisores es igual a mí mismo.',
    },
    {
      number: 7,
      msg: '¡Soy el número 7! Un número primo de la suerte y una cifra importante en muchas culturas.',
    },
    {
      number: 8,
      msg: '¡Soy el número 8! Represento la perfección, la simetría y la armonía en las matemáticas.',
    },
    {
      number: 9,
      msg: '¡Soy el número 9! Soy el último de los números de un solo dígito y estoy relacionado con propiedades interesantes en multiplicación.',
    },
    {
      number: 10,
      msg: '¡Soy el número 10! Represento el sistema decimal, fundamental en nuestras matemáticas y vida diaria.',
    },
    {
      number: 11,
      msg: '¡Soy el número 11! Soy el número primo más pequeño de dos dígitos, un símbolo de equilibrio y dualidad.',
    },
    {
      number: 12,
      msg: '¡Soy el número 12! Represento la docena y tengo múltiples divisores, lo que me hace muy versátil.',
    },
    {
      number: 13,
      msg: '¡Soy el número 13! Un número que causa supersticiones en algunas culturas, pero también un número primo muy poderoso.',
    },
    {
      number: 14,
      msg: '¡Soy el número 14! Soy el más bajo de los números compuestos, y estoy lleno de curiosidades matemáticas.',
    },
    {
      number: 15,
      msg: '¡Soy el número 15! La suma de mis dígitos es especial, ya que es igual a 6, el primer número perfecto.',
    },
    {
      number: 16,
      msg: '¡Soy el número 16! Represento la base de la aritmética binaria, la esencia de la computación moderna.',
    },
    {
      number: 17,
      msg: '¡Soy el número 17! Un número primo único con propiedades notables en matemáticas.',
    },
    {
      number: 18,
      msg: '¡Soy el número 18! Tengo muchos divisores, lo que me hace valioso en matemáticas recreativas.',
    },
    {
      number: 19,
      msg: '¡Soy el número 19! Un número primo que tiene propiedades intrigantes en secuencias matemáticas.',
    },
    {
      number: 20,
      msg: '¡Soy el número 20! Represento el sistema de puntuación perfecta en eventos, un número importante en estadísticas.',
    },
    {
      number: 21,
      msg: '¡Soy el número 21! La suma mágica de 3 y 7, ambos números con significado especial en diferentes culturas.',
    },
    {
      number: 22,
      msg: '¡Soy el número 22! Tengo simetría en mis dígitos y represento la dualidad y la estabilidad.',
    },
    {
      number: 23,
      msg: '¡Soy el número 23! Un número primo famoso y misterioso con propiedades únicas en matemáticas.',
    },
    {
      number: 24,
      msg: '¡Soy el número 24! Tengo muchos factores y, en el calendario, represento las horas de un día.',
    },
    {
      number: 25,
      msg: '¡Soy el número 25! Un cuarto de un centenar, relacionado con monedas y sistemas de medida.',
    },
    {
      number: 26,
      msg: '¡Soy el número 26! Soy la cifra de las letras del alfabeto inglés y un número capicúa.',
    },
    {
      number: 27,
      msg: '¡Soy el número 27! Tengo un significado espiritual y soy un cubo, 3^3.',
    },
    {
      number: 28,
      msg: '¡Soy el número 28! Un número perfecto y un número abundante, lo que me hace interesante en la teoría de números.',
    },
    {
      number: 29,
      msg: '¡Soy el número 29! Un número primo que tiene propiedades únicas en secuencias matemáticas.',
    },
    {
      number: 30,
      msg: '¡Soy el número 30! Represento el final de una década y la suma de mis dígitos es un número perfecto.',
    },
    {
      number: 31,
      msg: '¡Soy el número 31! El tercer número primo de dos dígitos, un número intrigante para los matemáticos.',
    },
    {
      number: 32,
      msg: '¡Soy el número 32! Soy una potencia de 2 y un número que aparece frecuentemente en contextos científicos.',
    },
    {
      number: 33,
      msg: '¡Soy el número 33! Tengo una simetría fascinante y soy considerado un número maestro en algunas creencias.',
    },
    {
      number: 34,
      msg: '¡Soy el número 34! Tengo una curiosidad matemática: soy la suma de los primeros pares de Fibonacci.',
    },
    {
      number: 35,
      msg: '¡Soy el número 35! Un número compuesto con propiedades interesantes en la teoría de números.',
    },
    {
      number: 36,
      msg: '¡Soy el número 36! Represento la cantidad de dados en muchos juegos de mesa y soy un número altamente compuesto.',
    },
    {
      number: 37,
      msg: '¡Soy el número 37! Un número primo que tiene un lugar significativo en la teoría de números.',
    },
    {
      number: 38,
      msg: '¡Soy el número 38! Tengo simetría en mis dígitos y soy un número compuesto.',
    },
    {
      number: 39,
      msg: '¡Soy el número 39! Tengo propiedades interesantes en secuencias matemáticas y soy divisible por 3.',
    },
    {
      number: 40,
      msg: '¡Soy el número 40! Tengo importancia histórica y cultural, además de ser una cifra redonda en el sistema decimal.',
    },
    {
      number: 41,
      msg: '¡Soy el número 41! Un número primo fascinante que tiene propiedades interesantes en matemáticas.',
    },
    {
      number: 42,
      msg: '¡Soy el número 42! La respuesta a la vida, el universo y todo, según el famoso libro de Douglas Adams.',
    },
    {
      number: 43,
      msg: '¡Soy el número 43! Un número primo con curiosidades en la teoría de números.',
    },
    {
      number: 44,
      msg: '¡Soy el número 44! Tengo simetría en mis dígitos y soy divisible por 4.',
    },
    {
      number: 45,
      msg: '¡Soy el número 45! Represento la suma de dos cubos, 3^3 + 4^3.',
    },
    {
      number: 46,
      msg: '¡Soy el número 46! Un número compuesto con curiosidades matemáticas.',
    },
    {
      number: 47,
      msg: '¡Soy el número 47! Un número primo que tiene un lugar especial en la teoría de números.',
    },
    {
      number: 48,
      msg: '¡Soy el número 48! Tengo muchos divisores y soy la suma de los primeros seis números naturales.',
    },
    {
      number: 49,
      msg: '¡Soy el número 49! Un número cuadrado perfecto y una potencia de 7.',
    },
    {
      number: 50,
      msg: '¡Soy el número 50! Un número redondo que marca la mitad de un centenar y soy la base de muchos sistemas de numeración.',
    },
    {
      number: 51,
      msg: '¡Soy el número 51! Un número impar con curiosidades en la teoría de números.',
    },
    {
      number: 52,
      msg: '¡Soy el número 52! Tengo simetría en mis dígitos y soy un número redondo.',
    },
    {
      number: 53,
      msg: '¡Soy el número 53! Un número primo con propiedades interesantes en secuencias matemáticas.',
    },
    {
      number: 54,
      msg: '¡Soy el número 54! Tengo muchos divisores y soy un número altamente compuesto.',
    },
    {
      number: 55,
      msg: '¡Soy el número 55! Un número doble y un número automórfico.',
    },
    {
      number: 56,
      msg: '¡Soy el número 56! Tengo simetría en mis dígitos y soy divisible por 7.',
    },
    {
      number: 57,
      msg: '¡Soy el número 57! Un número compuesto con propiedades matemáticas interesantes.',
    },
    {
      number: 58,
      msg: '¡Soy el número 58! Un número que se repite en la naturaleza, ya que es el número de electrones en un nivel de energía de muchos elementos.',
    },
    {
      number: 59,
      msg: '¡Soy el número 59! Un número primo que tiene propiedades únicas en matemáticas.',
    },
    {
      number: 60,
      msg: '¡Soy el número 60! Represento la cantidad de minutos en una hora y la suma de mis dígitos es un número perfecto.',
    },
    {
      number: 61,
      msg: '¡Soy el número 61! Un número primo que tiene un lugar significativo en la teoría de números.',
    },
    {
      number: 62,
      msg: '¡Soy el número 62! Tengo simetría en mis dígitos y soy un número altamente compuesto.',
    },
    {
      number: 63,
      msg: '¡Soy el número 63! Un número con muchas curiosidades matemáticas y culturales.',
    },
    {
      number: 64,
      msg: '¡Soy el número 64! Soy la base de la aritmética en muchas computadoras y represento el cuadrado de 8.',
    },
    {
      number: 65,
      msg: '¡Soy el número 65! Un número curioso en la teoría de números y soy divisible por 5.',
    },
    {
      number: 66,
      msg: '¡Soy el número 66! Tengo simetría en mis dígitos y soy un número altamente compuesto.',
    },
    {
      number: 67,
      msg: '¡Soy el número 67! Un número primo con propiedades matemáticas interesantes.',
    },
    {
      number: 68,
      msg: '¡Soy el número 68! Soy un número redondo y la suma de los primeros cuatro números cuadrados.',
    },
    {
      number: 69,
      msg: '¡Soy el número 69! Un número con connotaciones interesantes y culturales.',
    },
    {
      number: 70,
      msg: '¡Soy el número 70! Represento la cantidad de años en una generación y soy un número altamente compuesto.',
    },
    {
      number: 71,
      msg: '¡Soy el número 71! Un número primo con propiedades matemáticas interesantes.',
    },
    {
      number: 72,
      msg: '¡Soy el número 72! Soy altamente compuesto y tengo muchos divisores.',
    },
    {
      number: 73,
      msg: '¡Soy el número 73! Un número primo que tiene un lugar significativo en la teoría de números.',
    },
    {
      number: 74,
      msg: '¡Soy el número 74! Tengo simetría en mis dígitos y soy un número compuesto.',
    },
    {
      number: 75,
      msg: '¡Soy el número 75! Un número con múltiples significados y relaciones en matemáticas y la vida diaria.',
    },
    {
      number: 76,
      msg: '¡Soy el número 76! Tengo simetría en mis dígitos y soy un número compuesto.',
    },
    {
      number: 77,
      msg: '¡Soy el número 77! Un número con propiedades curiosas y culturales en diferentes partes del mundo.',
    },
    {
      number: 78,
      msg: '¡Soy el número 78! Tengo muchos divisores y soy un número altamente compuesto.',
    },
    {
      number: 79,
      msg: '¡Soy el número 79! Un número primo con propiedades matemáticas interesantes.',
    },
    {
      number: 80,
      msg: '¡Soy el número 80! Represento la cantidad de años en una vida humana y soy un número altamente compuesto.',
    },
    {
      number: 81,
      msg: '¡Soy el número 81! Soy un número cuadrado y la base de muchos sistemas de numeración.',
    },
    {
      number: 82,
      msg: '¡Soy el número 82! Tengo simetría en mis dígitos y soy un número compuesto.',
    },
    {
      number: 83,
      msg: '¡Soy el número 83! Un número primo con propiedades matemáticas interesantes.',
    },
    {
      number: 84,
      msg: '¡Soy el número 84! Soy altamente compuesto y tengo muchos divisores.',
    },
    {
      number: 85,
      msg: '¡Soy el número 85! Un número con propiedades matemáticas y curiosidades culturales.',
    },
    {
      number: 86,
      msg: '¡Soy el número 86! Tengo simetría en mis dígitos y soy un número compuesto.',
    },
    {
      number: 87,
      msg: '¡Soy el número 87! Un número con propiedades matemáticas interesantes.',
    },
    {
      number: 88,
      msg: '¡Soy el número 88! Tengo simetría en mis dígitos y soy un número compuesto.',
    },
    {
      number: 89,
      msg: '¡Soy el número 89! Un número primo que tiene un lugar significativo en la teoría de números.',
    },
    {
      number: 90,
      msg: '¡Soy el número 90! Represento la cantidad de grados en un ángulo recto y soy un número altamente compuesto.',
    },
    {
      number: 91,
      msg: '¡Soy el número 91! Un número con propiedades matemáticas y culturales interesantes.',
    },
    {
      number: 92,
      msg: '¡Soy el número 92! Tengo simetría en mis dígitos y soy un número compuesto.',
    },
    {
      number: 93,
      msg: '¡Soy el número 93! Un número con curiosidades matemáticas y culturales.',
    },
    {
      number: 94,
      msg: '¡Soy el número 94! Tengo simetría en mis dígitos y soy un número compuesto.',
    },
    {
      number: 95,
      msg: '¡Soy el número 95! Un número con propiedades matemáticas y culturales interesantes.',
    },
    {
      number: 96,
      msg: '¡Soy el número 96! Soy altamente compuesto y tengo muchos divisores.',
    },
    {
      number: 97,
      msg: '¡Soy el número 97! Un número primo que tiene un lugar significativo en la teoría de números.',
    },
    {
      number: 98,
      msg: '¡Soy el número 98! Tengo simetría en mis dígitos y soy un número compuesto.',
    },
    {
      number: 99,
      msg: '¡Soy el número 99! Un número con múltiples curiosidades matemáticas y culturales.',
    },
    {
      number: 100,
      msg: '¡Soy el número 100! Represento un hito y una centena, ¡un número completo en todos los sentidos!',
    },
  ];
  handleInput(event: any) {

    const query = event.target.value.toLowerCase();
    this.numberListResults = this.numberListResults.filter(
      (d) => d.number.toString().toLowerCase().indexOf(query) > -1
    );

  if(query===''){
      this.callNumberSold();
    }
  }

  addNumber(index: number, event: any) {
    if (event.target.checked) {
      this.shoppingCar.push(this.numberList[index - 1]);
    } else {
      this.shoppingCar = this.shoppingCar.filter(
        (item: any) => item !== this.numberList[index - 1]
      );
    }

    console.log(this.shoppingCar);
  }

  async openShoppingCar() {
    if (this.shoppingCar.length > 0) {
      this.isModalOpen = true;
    } else {
      const alert = await this.alertController.create({
        header: 'Aviso!',
        subHeader: 'Debe elegir al menos un número.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
  closeShoppingCar() {
    this.isModalOpen = false;
  }
}
