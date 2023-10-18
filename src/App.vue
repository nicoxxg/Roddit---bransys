
<template>
  <v-app>
    <v-app-bar location-strategy="connected" :elevation="1" class="d-flex">
      <div class="logo" @click="$router.push('/')">
        <v-avatar size="50" class="ma-3" image="https://styles.redditmedia.com/t5_35gpe/styles/communityIcon_vp2kfks4mera1.png"></v-avatar>
        <v-toolbar-title class=" w-50">
          <h3>Roddit</h3>
        </v-toolbar-title>
      </div>
      
      
     
      <v-spacer></v-spacer>

     

      
      
      <v-app-bar-nav-icon :color="drawer == true ? 'orange-accent-4' : 'black'" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list-item prepend-avatar="https://cdn-icons-png.flaticon.com/128/1384/1384035.png" title="John Leider"></v-list-item>

      <!--  -->
      <autocomplete  />

      <!--  -->
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item @click="$router.push('/')" color="black" prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
        <v-list-item color="black" prepend-icon="mdi-forum" @click="$router.push('/about')" title="About" value="about"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="main d-flex flex-column align-center justify-center">
      
      <router-view/>
    </v-main>
  </v-app>
</template>


<script>
import HomeView from './views/HomeView.vue';

import autocomplete from './components/autocomplete.vue';

export default {
  name: 'App',
  data() {
    return {
      loaded: false,
      loading: false,
      drawer: false,
      showChildElements: true, 
      users:undefined,
    };
  },
  computed:{
    isTabletOrSmaller() {
            return window.innerWidth <= 1024;
        },
  },
  mounted(){
        
  },
  methods:{

    
    
    onClickLoading () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
  },

  components: {
    HomeView,
    autocomplete
  }
}
</script>



<style>
.main{
  width: 400%; 
  height: 100%; 
  overflow: hidden; 
  background-color:rgb(232, 232, 250);
}

.logo{
  cursor: pointer; 
  display: flex; 
  justify-content: center; 
  align-items: center;
}

.v-navigation-drawer__scrim{
  width: 400% !important;
  height: 400% !important;
  overflow: hidden !important;
}

</style>