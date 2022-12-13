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
            qrCount: 0,
            emergencyNames: [],
            emergencyNameInputField: '',
            emergencyNameDescriptorInputField: ''
        }
    },
    methods: {
        loadUrls(){
            axios({
                method: 'get',
                url: '/api/v1/custom_urls/'
            }).then(response => {
                this.urls = response.data
                console.log('get data', response.data)
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
            if (document.querySelector('#user-auth-p').innerHTML == 'true'){
                console.log('is true')
            }
            else{
                console.log('isnt owkrin')
            }
        },
        randomKeyGenerator(){
            let result = ''
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            let charactersLength = characters.length
            for (let i = 0; i < 20; i++){
                result += characters.charAt(Math.floor(Math.random() * charactersLength))
            }
            return result
        },
        loadNames(){
            axios({
                method: 'get',
                url: '/api/v1/emergency_names/'
            }).then(response => {
                this.emergencyNames = response.data
                console.log('emergency_names',response.data)
                }
            ).catch(error => {
    
                console.log(error.response)
             
            })
        },
        test(){
            console.log('we here')
        },
        
        // EMERGENCY NAME CRUDS
        newNameInputFieldReveal(){
            document.querySelector('#new-emergency-name-button').style.display = "none"
            document.querySelector('#make-new-emergency-name-div').style.display = 'block'
            console.log('new input field')
        },
        createName(){
            console.log('yo',typeof parseInt(document.querySelector('#page-key').innerHTML),parseInt(document.querySelector('#page-key').innerHTML))
            axios({
                method: 'post',
                url: '/api/v1/emergency_names/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    descriptor: this.emergencyNameDescriptorInputField,
                    name: this.emergencyNameInputField,
                    url: parseInt(document.querySelector('#page-key').innerHTML)
                }
            }).then(response => {
                this.loadUrls()
                console.log('posted', response.data)
                document.querySelector('#new-emergency-name-button').style.display = "block"
                document.querySelector('#make-new-emergency-name-div').style.display = 'none'
    
            })
        },
        deleteName(id){
            axios({
                method: 'delete',
                url: '/api/v1/emergency_names/' + id,
                headers: {
                    'X-CSRFToken': this.csrfToken
                }
            }).then(response => {
                console.log('workin')
                this.loadUrls()
            })
        }
    },
    created: function() {
        this.loadUrls()
        this.loadNames()
        console.log('created')
   
         
    },


    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value

        console.log('MOUNTED')
       
    }
})