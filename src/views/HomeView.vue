<template>
  <v-card class="mx-auto ma-10" color="grey-lighten-3" :width="getResponsivewidth()">
        <v-card-text @click="$router.push(`/submit`)">
          <v-text-field
            :loading="loading"
            density="compact"
            variant="solo"
            label="Create Post"
            append-inner-icon="mdi-plus"
            single-line
            hide-details
            
          ></v-text-field>
        </v-card-text>
  </v-card>
  <v-container>
    <v-row class="justify-center flex-wrap">

      <d-col
        
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="post in posts"
        :key="post.id"
      >
        <v-card :width="getResponsivewidth()" class="ma-2 d-flex flex-column justify-center" v-bind:class="getResponsiveClass">
          <v-card-item>
            <v-card-title class="title text-decoration-underline " @click="$router.push(`/post?=${post.id}`)" >{{ post.title }}</v-card-title>
            <v-card-subtitle style="cursor: pointer; " class="hover-effect" @click="$router.push(`/user?=${post.userId}`)"> {{  getUserName(post.userId) }} </v-card-subtitle>
          </v-card-item> 
          <v-card-text class="description text-decoration-underline"  @click="$router.push(`/post?=${post.id}`)">
            {{ post.body }}
          </v-card-text>
        </v-card>
      </d-col>
    </v-row>
  </v-container>
  
  <submitPost @post-created="agregarPost"/>
</template>

<style scoped>
.hover-effect{
  transition: color 0.3s;
}
.hover-effect:hover{
  color: black;
  text-decoration: underline;
}
.description {
  cursor: pointer;
  max-width: 30vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title {
  cursor: pointer;
  max-width: 50vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

<script>

import submitPost from '@/components/posts.vue';


export default{
  name: 'HomeView',

  
  data() {
    return {
      message: "¡Hola desde Vue 3!",
      posts: [],
      users: {},
    };
  },
  methods: {
    agregarPost(newPost) {
      this.posts.push(newPost);
    },
    
    getResponsiveClass() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1280) {
        return "lg3";
      } else if (screenWidth >= 960) {
        return "md4";
      } else if (screenWidth >= 600) {
        return "sm6";
      } else {
        return "cols-12";
      }
    },
    loadUsers() {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(response => response.json())
      .then(users => {
        
        this.users = users.reduce((acc, user) => {
          acc[user.id] = user.username;
          return acc;
        }, {});
      });
  },
  getUserName(userId) {
    return this.users[userId] || "";
  },
    getResponsivewidth() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1280) {
        return "1100";
      } else if (screenWidth >= 960) {
        return "700";
      } else if (screenWidth >= 600) {
        return "500";
      } else {
        return "300";
      }
    },
    getAllPosts(){
      fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then(response => response.json())
      .then(response => {
        this.posts = response.sort((a,b) => a.id < b.id)
      })
    },
      
    
    
  },
  mounted(){
    this.loadUsers()
    this.getAllPosts()
    const parrafo = document.getElementsByClassName("description");
    if (parrafo.length > 0) {
      for (let i = 0; i < parrafo.length; i++) {
        
        if (parrafo[i].textContent.length > 20) {
          const textCopped = parrafo[i].textContent.split(0,30)+"..."
          parrafo[i].textContent = textCopped
        }
      }
    }
    const text = document.getElementsByClassName("title")
    
    if (text.length > 0) {
      for (let i = 0; i < text.length; i++) {
        
        if (text[i].textContent.length > 20) {
          const textCopped = text[i].textContent.split(0,30)+"..."
          text[i].textContent = textCopped
        }
      }
    }
  },
  


  
}
</script>
