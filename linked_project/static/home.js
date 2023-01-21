const home = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            message: 'hello world',
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
    computed: {
        reversedMessage: function () {
            // `this` points to the vm instance
            return this.message.split('').reverse().join('')
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
        test2(){
            console.log('test2', this.currentUser.qr_code_detail)
            for (i=0; i < this.currentUser.qr_code_detail.length; i++){
                this.dotOptionType = this.currentUser.qr_code_detail[i].dot_options_type
                this.dotOptionColor = this.currentUser.qr_code_detail[i].dot_options_color
                
                console.log(this.dotOptionType)
                qrCode = this.createQRCode()
                qrCode.append(document.querySelector('#user-codes'));

            }
        },
        test(){
            qrCode = this.createQRCode()
            console.log('testing', typeof qrCode, qrCode)
            document.querySelector('#canvas').style.display = "block"
            document.querySelector('#canvas').innerHTML = ''
            qrCode.append(document.querySelector('#user-codes'));
            // document.querySelector('#user-qr-0').innerHTML = 'WE DID IT'
            // Downloads to computer.
            // qrCode.download({ name: "qr", extension: "svg" });
            // qrCode.append(document.querySelector('#user-qr-0'))
            // console.log('should be a div here', document.querySelector('#user-qr-0'))
            
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
                width:150,
                height:150,
                type: "canvas",
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
                this.test2()
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
        
        console.log('created')
    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
        this.loadQRCodes()
        this.loadCurrentUser()
        console.log('home mounted')

    }
})