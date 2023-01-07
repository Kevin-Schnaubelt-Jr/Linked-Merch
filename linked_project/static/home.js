const home = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            currentUser: {},
            csrfToken: '',
            websiteInput: 'https://www.youtube.com/',
            
        }
    },
    methods: {
        test(){
            console.log('test')
        },
        loadCurrentUser(){
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
        generateQRCode(){
            let address = this.websiteInput
            let qrcodeContainer = document.querySelector('#qr-print-div')
            qrcodeContainer.innerHTML = ''
            new QRCode(qrcodeContainer, {
                text: address,
                width: 300,
                height: 300,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            })
            
        }
    },
    created: function() {

    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
        this.loadCurrentUser()
        console.log('home mounted')

    }
})