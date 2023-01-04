const base = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            currentUser: {},
        }
    },
    methods: {
        loadCurrentUser(){
            axios({
                method: 'get',
                url: '/users/currentuser/'
            }).then(response => {
                this.currentUser = response.data
                console.log('base current user', this.currentUser)
                this.qrCount = this.currentUser.urls_detail.length
            }).catch(error => {
              
                console.log(error.response)
            })
        },

    },
    created: function(){

    },
    mounted(){
        console.log('base mounted')
        this.loadCurrentUser()
    }
})