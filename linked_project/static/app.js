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
            },
            qrCount: 0
        }
    },
    methods: {
        loadUrls(){
            axios({
                method: 'get',
                url: '/api/v1/custom_urls/'
            }).then(response => {
                this.urls = response.data
                console.log(response.data)
                this.loadCurrentUser()
                }
            ).catch(error => {
    
                console.log(error.response)
             
            })
        },
        createUrl() {
            
            axios({
                method: 'post',
                url: '/api/v1/custom_urls/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    "unique_key" : this.randomKeyGenerator(),
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
                // console.log('CU', response.data)
                this.currentUser = response.data
                console.log('current user', this.currentUser)
                this.qrCount = this.currentUser.urls_detail.length
            }).catch(error => {
              
                console.log(error.response)
            })
        },
        randomKeyGenerator(){
            let result = ''
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            let charactersLength = characters.length
            for (let i = 0; i < 20; i++){
                result += characters.charAt(Math.floor(Math.random() * charactersLength))
            }
            return result
        }

    },
    created: function() {
        this.loadUrls()
        
    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
        console.log('MOUNTED')
       
    }
})