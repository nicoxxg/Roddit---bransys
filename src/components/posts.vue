<template>
     <v-row justify="center">
    <v-col
        class="ma-10"
        cols="12"
        sm="12"
        md="12"
        lg="12"
    >
      <v-card ref="form">
        <v-card-text>
            <v-select
            label="Select User"
            :items="userNames"
            item-title="username"
            item-value="id"
            :rules="[
                () => !!idUsername || 'This field is required',
            ]"
            v-model="idUsername"
            ></v-select>
            <v-text-field
            ref="address"
            v-model="title"
            :rules="[
                () => !!title || 'This field is required',
            ]"
            label="Title"
            placeholder="Snowy Rock Pl"
            counter="25"
            required
            ></v-text-field>

            <v-textarea 
            v-model="textBody"
            :rules="[
                () => !!textBody || 'This field is required',
            ]"
            label="Body"
            ></v-textarea>
        </v-card-text>

        <v-divider class="mt-12"></v-divider>

        <v-card-actions>
          <v-btn variant="text" @click="$router.push('/')" >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          
          <v-btn
            color="primary"
            variant="text"
            @click="createPost()"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import router from '@/router'

  export default {
    name: 'submitPost',
    data: () => ({
        idUsername: null,
        textBody: null,
        title: null,
        formHasErrors: false,
        userNames:[]
    }),
    mounted(){
        this.getAllUserName()
    },
    

    computed: {
        
        
        
    },

    watch: {
        name () {
            this.errorMessages = ''
        },
    },

    methods: {
        createPost(){
            

            if (this.idUsername == null || this.idUsername == 0 || this.title == null || this.title == "" || this.textBody == null || this.textBody == "") {
                return
            }
            fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: this.title,
                body: this.textBody,
                userId: this.idUsername,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => {
                this.$emit("post-created", json)
                router.push("/")
            });
        },
        getAllUserName(){
            fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(response => response.json())
            .then(response =>  {
                for (let i = 0; i < response.length; i++) {
                    this.userNames.push({
                        "username":response[i].username,
                        "id": response[i].id
                    })
                    
                }
                
                
            })
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
        addressCheck () {
            this.errorMessages = this.address && !this.name
            ? `Hey! I'm required`
            : ''

            return true
        },
        resetForm () {
            this.errorMessages = []
            this.formHasErrors = false

            Object.keys(this.form).forEach(f => {
            this.$refs[f].reset()
            })
        },
        submit () {
            this.formHasErrors = false

            Object.keys(this.form).forEach(f => {
            if (!this.form[f]) this.formHasErrors = true

                this.$refs[f].validate(true)
            })
        },
    },
}
</script>