const app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            currentUser: {},
            csrfToken: '',
            urls: [],
            newUrl: {
                "unique_key" : "",
                "template_key": 0,
                "author": "",
            }
        }
    },
    methods: {
        loadUrls(){
            axios({
                method: 'get',
                url: 'api/v1/custom_urls'
            }).then(response => {
                this.urls = response.data
                console.log(response.data)
                this.loadCurrentUser()
                }
            )
        },
        createToDo() {
            
            axios({
                method: 'post',
                url: '/api/v1/custom_urls/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    "unique_key" : this.newUrl.unique_key,
                    "template_key": this.newUrl.template_key,
                    "author": this.currentUser.id,
                }
            }).then( response => {
                this.loadUrls()
                console.log(response.data)
            }).catch(error => {
                console.log(error.response)
             
            })

        },
        loadCurrentUser(){
            axios({
                method: 'get',
                url: '/users/currentuser/'
            }).then(response => {
                console.log('CU', response.data)
                this.currentUser = response.data
            })
        }

    },
    created: function() {
        this.loadUrls()
        
    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
      
       
    }
})