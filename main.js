Vue.component('Juego', {
    mounted () {
        this.iniciarColores();
        console.log("El color a jugar es: " + this.colorAJugar)
        console.log(this.colores)
        console.log("El color a jugar es: " + this.colorAJugar)
      },
      data () {
        return {
          colorGanador: 'steelblue',
          colorAJugar: "",
          colores: [],
          hard: 6,
          easy: 3,
          dificultad: 6,
          colorBotones : {
            botonEasy: "rgb(251, 251, 251)",
            botonHard: "rgb(70, 130, 180)",
            letraEasy: "rgb(70, 130, 180)",
            letraHard: "rgb(251, 251, 251)"
          },
          mensaje: "",
          activador: ""
        }
      },
      methods: {
        iniciarColores() {
          this.colores = []
          this.colorGanador = 'steelblue'
          this.mensaje = ""
          for(var i = 0; i < this.dificultad; i++){
            this.colores[i] = this.generarStringColor();
          }
          this.colorAJugar = this.generarColorAJugar(this.dificultad)
        },
        mostrarDificultad() {
          return this.dificultad
        },
        modificarHard() {
          this.dificultad = this.hard;
          this.colorBotones.botonEasy = "rgb(251, 251, 251)";
          this.colorBotones.botonHard = "rgb(70, 130, 180)";
          this.colorBotones.letraEasy = "rgb(70, 130, 180)";
          this.colorBotones.letraHard = "rgb(251, 251, 251)";
        },
        modificarEasy() {
          this.dificultad = this.easy;
          this.colorBotones.botonEasy = "rgb(70, 130, 180)";
          this.colorBotones.botonHard = "rgb(251, 251, 251)";
          this.colorBotones.letraEasy = "rgb(251, 251, 251)";
          this.colorBotones.letraHard = "rgb(70, 130, 180)";
        },
        generarStringColor() {
          return "rgb(" + this.generarInt() + ", " + this.generarInt() + ", " + this.generarInt() + ")"
        },
        generarInt() {
          return Math.floor(Math.random() * 256);
        },
        generarColorAJugar(dificultad) {
          return this.colores[Math.floor(Math.random() * (dificultad - 1))]
        },
        actualizarColor(obj) {
          this.colores.splice(obj.index, 1, obj.color)
  
        },
        ganador(resultado) {
          if(resultado) {
            this.colorGanador = this.colorAJugar
            this.mensaje = "Ganaste!"
            let coloresGanadores = []
            for (let index = 0; index < this.colores.length; index++) {
              coloresGanadores[index] = this.colorGanador
            }
            this.colores = coloresGanadores
          }
          else {
            this.mensaje = "Inténtalo de nuevo!"
          }
        }
      },
      computed: {
  
      },
      template:
      `
        <section class="src-components-juego">
            <div id="body">
                <Cabecera
                :colorGanador="colorGanador"
                :colorAJugar="colorAJugar"
                />
                <Botonera
                :iniciarColores="iniciarColores"
                :modificarHard="modificarHard"
                :modificarEasy="modificarEasy"
                :colorBotones="colorBotones"
                :mostrarDificultad="mostrarDificultad"
                :mensaje="mensaje"
                />
                <Contenedor
                :colores="colores"
                :colorAJugar="colorAJugar"
                :ganador="ganador"
                :activador="activador"
                @actualizar-color="actualizarColor($event)"
                />
            </div>
        </section>
      `
  
})

Vue.component('Cabecera', {
    name: 'src-components-cabecera',
    props: {
      colorGanador:String,
      colorAJugar:String
    },
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    },
    template:
    `
        <section class="src-components-cabecera">
            <div id="header" :style="{'background-color': colorGanador}">  
            <h1>The Great
            <br>
            <span id="colorDisplay">{{ colorAJugar }}</span>
            <br>
            Guessing Game</h1>
            </div>
        </section>
    `
})

Vue.component('Botonera', {
    name: 'src-components-botonera',
    props: {
      iniciarColores: Function,
      modificarHard: Function,
      modificarEasy: Function,
      colorBotones: Object,
      mostrarDificultad: Function,
      mensaje: String
    },
    mounted () {
      
    },
    data () {
      return {

      }
    },
    methods: {
      iniciarEasy() {
        if(this.mostrarDificultad() == 6) {
          this.modificarEasy();
          this.iniciarColores();
        }
      },
      iniciarHard() {
        if(this.mostrarDificultad() == 3) {
          this.modificarHard();
          this.iniciarColores();
        }
      }
    },
    computed: {
      
    },
    template: 
    `
        <section class="src-components-botonera">
            <div id="navitagor">
                <button id="reset" @click="iniciarColores">New Colors!</button>
                <span id="message">{{ mensaje }}</span>
                <button
                    id="easy" 
                    @click="iniciarEasy"
                    :style="{'background-color': colorBotones.botonEasy, 'color': colorBotones.letraEasy}">
                easy
                </button>
                <button
                    id="hard"
                    @click="iniciarHard"
                    :style="{'background-color': colorBotones.botonHard, 'color': colorBotones.letraHard}">
                hard
                </button>
            </div>  
        </section>
    `
})

Vue.component('Contenedor', {
    name: 'src-components-contenedor',
    props: {
      colores: Array,
      colorAJugar: String,
      ganador: Function,
      activador: String
    },
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {
      actualizarColor(obj) {
        this.$emit('actualizar-color', obj)
      }
    },
    computed: {

    },
    template:
    `
        <section class="src-components-contenedor">
            <div id="container">
                <div v-for="(color, index) in colores" :key="index">
                    <Cuadrado 
                    :color="color"
                    :colorAJugar="colorAJugar"
                    :index="index"
                    :ganador="ganador"
                    :activador="activador"
                    @actualizar-color="actualizarColor($event)"
                    />
                </div>
            </div>
        </section>
    `
})

Vue.component('Cuadrado', {
    name: 'src-components-cuadrado',
    props: {
      color: String,
      colorAJugar: String,
      index: Number,
      ganador: Function,
      activador: String
    },
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {
      mostrarColor() {
        if(this.color != this.colorAJugar){
          let obj = {
            color: "#232323",
            index: this.index
          }
          this.$emit('actualizar-color', obj)
          this.ganador(false)
        }
        else {
          this.ganador(true)
        }
      }
    },
    computed: {

    },
    template:
    `
        <section class="src-components-cuadrado">
            <div class="square"
                :style="{'background-color': color}"
                @click="mostrarColor"
            >{{activador}}
            </div>
        </section>
    `
})

var app = new Vue({
    el: '#app',
    data: {
    },
    methods: {

    },
    computed: {

    }
})