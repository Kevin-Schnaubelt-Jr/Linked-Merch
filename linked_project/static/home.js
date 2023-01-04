const home = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            currentUser: {},
            csrfToken: '',
            
        }
    },
    methods: {
        test(){
            console.log('test')
        },
        loadCurrentUser(){
            console.log('lets gooo')
            axios({
                method: 'get',
                url: '/users/currentuser/'
            }).then(response => {
                this.currentUser = response.data
                console.log('home current user', this.currentUser)
                this.qrCount = this.currentUser.urls_detail.length
            }).catch(error => {
              
                console.log(error.response)
            })
        },
    },
    created: function() {

    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
        this.loadCurrentUser()
        console.log('home mounted')

    }
})