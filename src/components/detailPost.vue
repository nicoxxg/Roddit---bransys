<style>

.icon-trash{
    transition: 0.3s;
    cursor: pointer;
    align-items: center;
}
.icon-edit{
    transition: 0.3s;
    cursor: pointer;
}
.icon-trash:hover{
    color: red;
}
.icon-edit:hover{
    color: cornflowerblue;
}
.templateDetail{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 3rem;
}
</style>

<template class="templateDetail ma-1">

    <v-container>
        <v-card
        class="mx-auto"
        v-if="user != null && post != null"
        theme="#E0E0E0"
        :width="getResponsivewidth()"
        
        >
    

    
    
        <div class="d-flex justify-space-between align-center mr-8">   
            <v-card 
            v-if="!edit"
            style="box-shadow: none; "
            
            :title="post.title"
            

            >

            </v-card>
            <v-text-field  class=" ma-2" label="New title" v-model="newTitle" v-if="edit" variant="outlined"></v-text-field>
            
            <v-card   style="box-shadow: none; display: flex; flex-wrap: wrap; flex-direction: row; ">
                <div v-if="!edit" class=" ma-3 " @click="changeEditComment()" >
                    <font-awesome-icon size="xl" class="icon-edit" icon="fa-solid fa-pen-to-square" />
                </div>
                <div v-if="!edit" class=" ma-3  ">
                
                    <v-row justify="center">
                        <v-dialog v-model="dialog" persistent width="auto">
                            <template v-slot:activator="{ props }">
                            <v-card-title class="icon-trash">
                                <font-awesome-icon
                                v-bind="props"
                                class="icon-trash"
                                size="xl"
                                :icon="['fas', 'trash']"
                                />
                            </v-card-title>
                            </template>
                            <v-card>
                            <v-card-title class="text-h5">
                                Are you sure you want to delete this post?
                            </v-card-title>
                            <v-card-text>
                                It will be impossible to recover when it is deleted.
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green-darken-1" variant="text" @click="dialog = false">
                                Cancel
                                </v-btn>
                                <v-btn color="red-darken-1" variant="text" @click="deletePost(post.id)">
                                Delete
                                </v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-row>
                </div>

                <!--  -->
                
                <div class=" ma-2 "
                v-if="edit"
                @click="changeEditComment()" >
                    <font-awesome-icon size="xl" class="icon-trash" icon="fa-solid fa-ban" />
                </div>
                <div
                    v-if="edit"
                    @click="changePost(post.id,post.userId)"
                    class=" ma-2 ">
                    <font-awesome-icon class="icon-edit" size="xl" :icon="['fas', 'check']" />
                </div>
            </v-card>

        </div>
            

            <v-card-text v-if="!edit" class="text-h5 py-2">
            {{ post.body }}
            </v-card-text>
            <v-textarea v-if="edit" class=" ma-2 " label="New Body" v-model="newBody" variant="outlined"></v-textarea>

            <v-card-actions>
            <v-list-item class="w-100" @click="$router.push(`/user?=${user.id}`)" style="cursor: pointer;">
                
                <template v-slot:prepend>
                    <v-avatar
                        
                        image="https://cdn-icons-png.flaticon.com/128/1384/1384035.png"
                    ></v-avatar>
                </template>

                <v-list-item-title >{{ user.name}}</v-list-item-title>

                <v-list-item-subtitle style="text-decoration: underline;">{{ user.username }}</v-list-item-subtitle>

                
            </v-list-item>
                
            </v-card-actions>


            <v-divider class="border-opacity-25" color="warning"></v-divider>
        </v-card>

        <v-card
        class="mx-auto mt-2 mb-2"
        title="Comments:"
        style="z-index: 0;"
        :width="getResponsivewidth()"
        >
        <v-divider class="border-opacity-25" color="warning"></v-divider>
        </v-card>
        <CommentsPost class=" ma-3" />

    </v-container>

</template>


<script>
import router from '@/router';
import CommentsPost from '@/components/comments.vue';

export default{
    name: "DetailPost",
    data: () => ({
        newTitle: undefined,
        newBody: undefined,
        post:undefined,
        user:{},
        comments:undefined,
        edit:false,
        dialog: false,
        
    }),
    mounted() {
        this.getPostByIdPath();
    },

    computed: {},

    methods: {
        deletePost(id){
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE',
            }).then(() => {
                this.dialog = false
                this.$router.push("/")
            })
            
            ;


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
    
        changeEditComment(){
            this.edit = !this.edit;
            if (this.post) {
                this.newTitle = this.post.title
                this.newBody = this.post.body 
            }
        },
        changePost(idPost,userId){
            fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: idPost,
                title: this.newTitle,
                body: this.newBody,
                userId: userId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => {
                this.post = json
                this.edit = false
            });

        },
        getPostByIdPath() {
            const id = window.location.href.split('?=')[1];

            if (id !== undefined) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then((response) => response.json())
                .then((response) => {
                this.post = response;
                console.log(this.post);

                    this.getUserPosted();
                    
                })
                .catch((error) => console.error(error));
            }
        },
        getUserPosted() {
            const id = window.location.href.split('?=')[1];

            if (id !== undefined) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then((response) => response.json())
                .then((response) => {
                    fetch(`https://jsonplaceholder.typicode.com/users/${response.userId}`)
                    .then((response) => response.json())
                    .then((response) => {
                        this.user = response;
                    
                    });
                })
                .catch((error) => console.error(error));
        
            }
            
        },
        
    },
    components: {
        CommentsPost,
    },

}


</script>