const home = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            currentUser: {},
            csrfToken: '',
            websiteInput: 'youtube.com',
            newQRCodes: {},
            blobHold: 0,

            dotOptionType: 'extra-rounded',
            dotOptionsCounter: 0,
            dotTypes: ['extra-rounded', 'dots', 'classy', 'classy-rounded', 'square'],

            dotOptionColor: '#6a1a4c',

            backgroundOptionColor: "#ffffff",

            cornersSquareOptionType: "extra-rounded",
            cornersSquareOptionColor: "#000000",

            cornersDotOptionType: "extra-rounded",
            cornersDotOptionColor: "#000000"







            
        }
    },
    methods: {
        randomKeyGenerator(){
            let result = ''
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            let charactersLength = characters.length
            for (let i = 0; i < 20; i++){
                result += characters.charAt(Math.floor(Math.random() * charactersLength))
            }
            return result
        },
        test(){
            qrCode = this.createQRCode()
            console.log('testing', typeof qrCode, qrCode)
            document.querySelector('#canvas').style.display = "block"
            document.querySelector('#canvas').innerHTML = ''
            qrCode.append(document.getElementById("canvas"));
            // Downloads to computer.
            // qrCode.download({ name: "qr", extension: "svg" });
        },
        changeDots(){
            console.log('error',this.dotOptions.length)
            this.dotOptionsCounter++
            if (this.dotOptionsCounter === this.dotOptions.length){
                this.dotOptionsCounter = 0
            }
            this.dotOption = this.dotOptions[this.dotOptionsCounter]
            this.test()
        },
        createQRCode(){
            // 'http://127.0.0.1:8000/template/0/' development url
            // 'https://linked-shirts.herokuapp.com/template/0/'
            const qrCode = new QRCodeStyling({
                width:300,
                height:300,
                type: "svg",
                data:"https://sites.google.com/view/linkmerch/home",
                image:"/static/EmbeddedImage.png",
                margin:0,
                qrOptions:{
                    typeNumber:0,
                    mode:"Byte",
                    errorCorrectionLevel:"H"
                    },
                    
                imageOptions:{
                    hideBackgroundDots:true,
                    imageSize:0.4,
                    margin:0
                    },
                    
                dotsOptions:{
                    type: this.dotOptionType,
                    color: this.dotOptionColor
                    },
                    
                backgroundOptions:{
                    color:this.backgroundOptionColor
                    },
                    
                dotsOptionsHelper:{
                    colorType:{
                        single:true,
                        gradient:false
                        },
                    gradient:{
                        linear:true,
                        radial:false,
                        color1:"#6a1a4c",
                        color2:"#6a1a4c",
                        rotation:"0"
                        }
                    },
                cornersSquareOptions:{
                    type: this.cornersSquareOptionType,
                    color: this.cornersSquareOptionColor
                    },
                    
                cornersSquareOptionsHelper:{
                    colorType:{
                        single:true,
                        gradient:false
                        },
                    gradient:{
                        linear:true,
                        radial:false,
                        color1:"#000000",
                        color2:"#000000",
                        rotation:"0"
                        }
                    },
                    
                cornersDotOptions:{
                    type: this.cornersDotOptionType,
                    color: this.cornersDotOptionColor
                    },
                    
                cornersDotOptionsHelper:{
                    colorType:{
                        single:true,
                        gradient:false
                        },
                    gradient:{
                        linear:true,
                        radial:false,
                        color1:"#000000",
                        color2:"#000000",
                        rotation:"0"
                        }
                    },
                    
                backgroundOptionsHelper:{
                    colorType:{
                        single:true,
                        gradient:false
                        },
                    gradient:{
                        linear:true,
                        radial:false,
                        color1:"#ffffff",
                        color2:"#ffffff",
                        rotation:"0"
                        }
                    }
            });
            return qrCode
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
              
                console.log('load user errors', error.response)
            })
        },
        loadQRCodes(){
            axios({
                method: 'get',
                url: '/api/v1/custom_urls/'
            }).then(response => {
                this.newQRCodes = response.data
                console.log('get QR codes', response.data)
                
                }
            ).catch(error => {
    
                console.log('load QR errors', error.response)
             
            })
        },
        
            
    },
    created: function() {

    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
        this.loadCurrentUser()
        this.loadQRCodes()
        console.log('home mounted')

    }
})