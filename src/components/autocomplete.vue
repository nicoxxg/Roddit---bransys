<style>
.list-container {
  position: relative !important;
}

.list {
  position: absolute;
  z-index: 1015 !important;
  width: 100%;
  background: rgba(255, 255, 255, 0.822);
  border-radius: 6px;
  overflow: hidden;
  top: 100%; 
  left: 0;
}

.options {
  border-bottom: 1px solid black; 
  padding: 15px 0 15px 70px;
  list-style: none;
  cursor: pointer;
  box-sizing: border-box;
  position: relative !important;
  background-color: white ;
  z-index: 1015 !important;
}
</style>

<template>
  <div>

    <v-text-field
      v-model="search"
      clearable
      label="Search Username"
      
      variant="outlined"
    ></v-text-field>

    <div class="list-container">
      <ul class="list" v-show="filterUsers.length">
        <li
          class="options"
          v-for="user in filterUsers"
          :key="user.id"
          @click=" changePageToProfile(user.id)"
        >
          {{ user.username }}
        </li>
      </ul>
    </div>

    {{ serchResults }}
  </div>
</template>


<script>
import router from '@/router';
import { ref } from 'vue';

export default{
    name:"autocomplete",
    props: ['filterUsers', 'isTabletOrSmaller'],
    data(){
        return{
            users:undefined,
            
            search: ref(''),
            filterUsers: [],
            selectedUser: null,

        }
    },
    methods:{

        changePageToProfile(id){
            let idPath = window.location.href.split('?=')[1];
            if (id != idPath) {
                router.push(`/user?=${id}`)
                .then(() => window.location.reload() )
                

                
            }
            


        },
        
        getAllUsers(){
            fetch("https://jsonplaceholder.typicode.com/users/")
            .then(response => response.json())
            .then(response =>{
                this.users = response
            })

        },
    },
    computed:{

        serchResults() {
            if (this.users !== undefined) {
                if (this.search === "" || this.search == null) {
                this.filterUsers = []; // Reinicializa el arreglo
                } else {
                this.filterUsers = this.users.filter((user) => {
                    return user.username.toLowerCase().includes(this.search.toLowerCase());
                });
                }
            }
        },

        isTabletOrSmaller() {
            return window.innerWidth <= 1024;
        },

    },
    mounted(){
        this.getAllUsers()
    }
}

</script>