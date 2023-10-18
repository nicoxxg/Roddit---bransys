<template v-if="comments != undefined" class="d-flex flex-column justify-center align-center">
        
        <v-card
            class="mx-auto rounded-0 mb-2" 
            theme="#E0E0E0"
            :width="getResponsivewidth()"

            v-for="comment in comments"
            >

        
            <template v-slot:title class=" ma-3">
                    <h5>{{ comment.name }}</h5>
            </template>

            <v-card-text  class="text-subtitle-1 ma-2 ">
                    <p >{{ comment.body }}</p>
            </v-card-text>
            

            <v-card-actions>
            <v-list-item class="w-30 h-25" style="cursor: pointer;">
                <!-- @click="$router.push(`/user?=${user.id}`)"  -->
                
                <template v-slot:prepend>
                    <v-avatar
                        
                        image="https://cdn-icons-png.flaticon.com/128/1384/1384035.png"
                    ></v-avatar>
                </template>

                <v-list-item-title  style="text-decoration: underline;" class="text-subtitle-1"  > {{ comment.email }} </v-list-item-title>

                

                
            </v-list-item>
                
            </v-card-actions>

            <v-divider class="border-opacity-25" color="warning"></v-divider>


            
        </v-card>
</template>


<script>

export default {
    name: "CommentsPost",
    data(){
        return{
            comments:undefined,

        }
    },
    mounted(){
        this.getCommentsPosted()
    },
    methods:{
        
        getCommentsPosted() {
            const id = window.location.href.split('?=')[1];
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then((response) => response.json())
            .then((response) => {
                this.comments = response;
                console.log(this.comments);
            });
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

    }

}

</script>