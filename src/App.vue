<template>
  <div id="app">
 
    <nav class="navbar navbar-dark bg-primary">
      <a href="/" class="navbar-brand">Cloudappi Empleados</a>
    </nav>
    <!-- MAIN CONTENT -->
    <div class="container">
      <div class="row" style="margin-top:40px">
        <div class="col-sm">
          <div class="card">
            <div class="card-header text-center">
              <h4>Nuevo empleado</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="addEmpleado">
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newEmpleado.nombre" placeholder="Nombre">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newEmpleado.apellido" placeholder="Apellido">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newEmpleado.ciudad" placeholder="Ciudad">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newEmpleado.categoria" placeholder="Puesto">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newEmpleado.antiguedad" placeholder="Antiguedad">
                </div>
                <button type="submit" class="btn btn-primary" @click="getNewId()">Enviar</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-sm text-center" style="margin-top:150px">
          <img src="./assets/logo.png" width="150" class="logo">
        </div>
        <div class="col-sm">
          <div class="card">
            <div class="card-header text-center">
              <h4>Lista de empleados</h4>
            </div>
            <div class="card-body">
              <form action="">
                <table class="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Ciudad</th>
                      <th>Puesto</th>
                      <th>Antiguedad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(post, index) in posts" :key="index">
                      <td>{{post.id}}</td>
                      <td>{{post.nombre}}</td>
                      <td>{{post.apellido}}</td>
                      <td>{{post.ciudad}}</td>
                      <td>{{post.puesto.categoria}}</td>
                      <td class="text-center">{{post.puesto.antiguedad}}</td>
                      <td>
                        <button class="btn btn-danger btn-sm" @click="deleteEmpleado(index)">X</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Firebase from 'firebase';
import config from './config';
import { uuid } from 'vue-uuid' 
let app = Firebase.initializeApp(config);
let db = app.database();
let empleadosRef = db.ref('empleados');
let datos = '';

export default {
  name: 'App',
  firebase: {
    empleados: empleadosRef
  },
  data() {
    return {
      posts: [],
      uuid: uuid.v1(),
      id: null,
      newEmpleado: {
        id: uuid,
        nombre: '',
        apellido: '',
        ciudad: '',
        puesto: {
          categoria: '',
          antiguedad: ''      
        }
      }
    }
  },

  mounted() {
    var that = this;
    // axios.get('https://wso2ei-36e1e.firebaseio.com/empleados.json')
     axios.get('http://localhost:8280/firebaseapi/listaEmpleados')
    .then(function (response) {
       that.posts = response.data;
       console.log(that.posts)
    })
    .catch(function (error) {
       console.log('Error: ' + error);
    }); 
  },

  methods: {
    sendEmpleado(data) {
      const headers = {
  'Content-Type': 'application/json',
  "Access-Control-Allow-Origin": "*"
};

      console.log(data)
          //  axios.post('https://wso2ei-36e1e.firebaseio.com/empleados.json', {
            axios.post('http://localhost:8280/empleado/crear', {
            // {headers: headers},
            /*  {
                  id:this.uuid.substring(0,8),
                  nombre:data.nombre,
                  apellido:data.apellido,
                  ciudad:data.ciudad,
                  puesto: {
                    categoria:data.puesto.categoria,
                    antiguedad:data.puesto.antiguedad
                  }  */
                  
                id:this.uuid.substring(0,8),
                  nombre:data.nombre,
                  apellido:data.apellido,
                  ciudad:data.ciudad,
                  puesto: data.categoria,
                  antiguedad: data.antiguedad 
            } 
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    addEmpleado() {
       console.log("añadiendo")
      this.sendEmpleado(this.newEmpleado);
      console.log(this.newEmpleado);
      this.clearEmpleadoForm();      

    },
    clearEmpleadoForm() {
      this.newEmpleado.nombre='';
      this.newEmpleado.apellido='';
      this.newEmpleado.ciudad = '';
      this.newEmpleado.puesto = '';
    },
    deleteEmpleado(id) {
      console.log(id)
      empleadosRef.child(id).remove();
    }
  },
   computed: {
      getNewId: function () {
       const id = this.id;
       const newID = this.$uuid.v4();
       return {
          id: newID,
        }
      }
    }
}
</script>

<style>

</style>
