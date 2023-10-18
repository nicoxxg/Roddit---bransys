<template>
    <div class="d-flex flex-wrap flex-row">

        <v-card
            v-if="user != undefined"
            class="mx-auto my-12"
            height="450"
            :width="getResponsivewidth"
        >
            

            <v-card
                cover
                height="250"
                :width="getResponsivewidth"
                theme="dark"
                class="d-flex flex-column justify-center align-center"
                
            >

                <v-card-action>
                    <v-avatar image="https://www.redditinc.com/assets/images/site/reddit-logo.png" size="70"></v-avatar>
                </v-card-action>
                <v-card-title>{{ user.name }}</v-card-title>
                <v-card-subtitle>
                    @{{ user.username }}
                </v-card-subtitle>
            
            </v-card>

            

            <v-card-text>
            

                <div class="my-4 text-subtitle-1">
                    Website:
                    <br>

                    <a :href="user.website"> <b>{{ user.website }}</b> </a>
                </div>

            
            </v-card-text>

            <v-card-item>
                <v-card-subtitle>email: {{ user.email }}</v-card-subtitle>

                <v-card-subtitle>
                    <span class="me-1">phone: {{ user.phone }}</span>
                </v-card-subtitle>
            </v-card-item>

        </v-card>
        <v-container v-if="posts != undefined && user != undefined">
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
                    <v-card-subtitle style="cursor: pointer; " class="hover-effect" @click="$router.push(`/user?=${post.userId}`)"> {{ user.username }} </v-card-subtitle>
                </v-card-item> 
                <v-card-text class="description text-decoration-underline"  @click="$router.push(`/post?=${post.id}`)">
                    {{ post.body }}
                </v-card-text>
                </v-card>
            </d-col>
            </v-row>
        </v-container>

    </div>

        
        

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

export default{
    name: "userDetails",
    data(){
        return{
            loading: false,
            selection: 1,
            user:undefined,
            posts:undefined,

        }
    },
    methods:{
        getUserByPath(){
            const id = window.location.href.split('?=')[1];
            if (id) {
                fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(Response => Response.json())
                .then((response) => {
                    this.user=response
                    console.log(this.user)
                })
            }
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
        getResponsivewidth() {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1280) {
                return "1000";
            } else if (screenWidth >= 960) {
                return "600";
            } else if (screenWidth >= 600) {
                return "400";
            } else {
                return "200";
            }
        },
        getPostsByUserId(){
            const id = window.location.href.split('?=')[1];
            if (id) {
                fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
                .then(Response => Response.json())
                .then((response) => {
                    this.posts=response
                    console.log(this.user)
                })
            }
            
        },
        

    },
    mounted(){
        this.getPostsByUserId()
        this.getUserByPath()

    }

}

</script>