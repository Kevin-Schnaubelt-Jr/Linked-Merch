const home = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            message: 'hello world',
            currentUser: {},
            csrfToken: '',
            websiteInput: 'https://linked-shirts.herokuapp.com/',
            newQRCodes: {},
            creationTransition: false,
            dropDownBool1: false,

            qrCodeSize: 150,

            dotOptionType: 'extra-rounded',
            dotOptionsCounter: 0,
            dotTypes: ['extra-rounded', 'dots', 'classy', 'classy-rounded', 'square'],

            dotOptionColor: '#6a1a4c',

            backgroundOptionColor: "#ffffff",

            cornersSquareOptionType: 'extra-rounded',
            cornersSquareOptionColor: "#000000",

            cornersDotOptionType: 'extra-rounded',
            cornersDotOptionColor: "#000000",

            userCodeImage: '',







            
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
        displayUserQRCodes(){
            console.log('display codes function', this.currentUser.qr_code_detail[0])
            for (i=0; i < this.currentUser.qr_code_detail.length; i++){
                this.dotOptionType = this.currentUser.qr_code_detail[i].dot_options_type
                this.dotOptionColor = this.currentUser.qr_code_detail[i].dot_options_color
                this.backgroundOptionColor = this.currentUser.qr_code_detail[i].background_options_color
                this.cornersSquareOptionType = this.currentUser.qr_code_detail[i].corner_square_options_type
                this.cornersSquareOptionColor = this.currentUser.qr_code_detail[i].corner_square_options_color
                this.cornersDotOptionType = this.currentUser.qr_code_detail[i].dot_options_type
                this.cornersDotOptionColor = this.currentUser.qr_code_detail[i].dot_options_color
                this.userCodeImage = this.currentUser.qr_code_detail[i].image

                let newDiv = document.createElement('div')
                newDiv.classList = 'flex flex-col items-center text-4xl'
                let newElement = document.createElement('p')
                newElement.innerHTML = 'Click Me!'
                qrCode = this.createQRCode()
                // qrCode.append(document.querySelector('#user-codes'));
                newDiv.append(newElement)
                qrCode.append(newDiv)
                document.querySelector('#user-codes').append(newDiv)
                
            }
            
            console.log('user-codes', document.querySelector('#user-codes'))

            for (i=0; i < document.querySelector('#user-codes').children.length; i++){
                let eventListenerKey = this.currentUser.qr_code_detail[i].unique_key
                document.querySelector('#user-codes').children[i].classList.add('cursor-pointer')
                // document.querySelector('#user-codes').children[i].classList.add('scale-50')
                document.querySelector('#user-codes').children[i].addEventListener('click', function(){
                    console.log('inside add event', eventListenerKey)
                    window.location = 'http://127.0.0.1:8000/template/0/' + eventListenerKey
                })

            }
        },
        generateAndSnap(){
            console.log('transition bool', this.creationTransition)
            if (this.creationTransition){
                this.setDefaults()
                this.qrCodeSize = 300

                qrCode = this.createQRCode()
                console.log('testing', typeof qrCode, qrCode)
                qrCode.append(document.querySelector('#canvas'))
                window.location = '#snap-test'
            }
            // qrCode.append(document.querySelector('#user-codes'));
            // document.querySelector('#user-qr-0').innerHTML = 'WE DID IT'
            // Downloads to computer.
            // qrCode.download({ name: "qr", extension: "svg" });
            // console.log('should be a div here', document.querySelector('#user-qr-0'))
            
        },
        makeButton(){
            document.querySelector('#snap-test').style.display = 'block'
            this.creationTransition = !this.creationTransition
        },
        test4(){

            for (i=0; i<3;i++){
                let newDiv = document.createElement('div')
                let newElement = document.createElement('p')
                newElement.innerHTML = 'Click Me!'
                let newElement2 = document.createElement('p')
                newElement2.innerHTML = 'PICTURE'
    
                newDiv.append(newElement, newElement2)
                document.querySelector('#test-div').append(newDiv)
                console.log('test4', newDiv)
            }
            

        },
        setDefaults(){
            this.dotOptionType = 'extra-rounded'
            this.dotOptionColor = '#6a1a4c'
            this.backgroundOptionColor = "#ffffff"
            this.cornersSquareOptionType = 'extra-rounded'
            this.cornersSquareOptionColor = "#000000"
            this.cornersDotOptionType = 'extra-rounded'
            this.cornersDotOptionColor = "#000000"
        },
        createQRCode(){
            // 'http://127.0.0.1:8000/template/0/' development url
            // 'https://linked-shirts.herokuapp.com/template/0/'
            const qrCode = new QRCodeStyling({
                width: this.qrCodeSize,
                height: this.qrCodeSize,
                type: "canvas",
                data:"https://sites.google.com/view/linkmerch/home",
                image:this.userCodeImage,
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
                this.displayUserQRCodes()
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