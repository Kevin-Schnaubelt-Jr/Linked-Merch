const home = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            message: 'hello world',
            currentUser: {},
            csrfToken: '',
            websiteInput: 'https://linked-shirts.herokuapp.com/',
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

            makeQRCodeButtonCheck: 0,







            
        }
    },
    computed: {
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
            // indicator is used to add an index for adding event listeners
            let indicator = 0
            this.qrCodeSize = 150
            document.querySelector('#user-codes').innerHTML = ''
            // console.log('display codes function', this.currentUser.qr_code_detail[0])
            for (i=0; i < this.currentUser.qr_code_detail.length; i++){
                this.dotOptionType = this.currentUser.qr_code_detail[i].dot_options_type
                this.dotOptionColor = this.currentUser.qr_code_detail[i].dot_options_color
                this.backgroundOptionColor = this.currentUser.qr_code_detail[i].background_options_color
                this.cornersSquareOptionType = this.currentUser.qr_code_detail[i].corner_square_options_type
                this.cornersSquareOptionColor = this.currentUser.qr_code_detail[i].corner_square_options_color
                this.cornersDotOptionType = this.currentUser.qr_code_detail[i].dot_options_type
                this.cornersDotOptionColor = this.currentUser.qr_code_detail[i].dot_options_color
                this.userCodeImage = this.currentUser.qr_code_detail[i].image

                // 'http://127.0.0.1:8000/template/0/' development url
                // 'https://linked-shirts.herokuapp.com/template/0/'
                // must change before deploying/ before developing
                // MODE= deploy
                this.websiteInput = 'https://linked-shirts.herokuapp.com/template/0/' + this.currentUser.qr_code_detail[i].unique_key

                // make an outer div and style it
                let topDiv = document.createElement('div')
                topDiv.classList = 'flex flex-col items-center text-3xl'

                // make a click me! p element
                let labelElement = document.createElement('p')
                labelElement.innerHTML = 'Click Me!'
                topDiv.append(labelElement)

                // make code and put it into a nested div
                let innerDiv = document.createElement('div')
                innerDiv.classList.add('cursor-pointer')
                qrCode = this.createQRCode()
                qrCode.append(innerDiv)
                let key = this.currentUser.qr_code_detail[i].unique_key
                // MODE= deploy
                innerDiv.addEventListener('click', function(){
                    window.location = 'https://linked-shirts.herokuapp.com/template/0/' + key
                })
                topDiv.append(innerDiv)

                // make a delete button and add it to the top div
                let codeID = this.currentUser.qr_code_detail[i].id
                let deleteButton = document.createElement('button')
                deleteButton.classList = 'fa-regular fa-circle-xmark text-2xl'
                deleteButton.addEventListener('click', function(){
                    this.test1(codeID)
                }.bind(this))
                topDiv.append(deleteButton)
                document.querySelector('#user-codes').append(topDiv)
                indicator++
                
            }
            
            // console.log('user-codes', document.querySelector('#user-codes'))

            // for (i=0; i < document.querySelector('#user-codes').children.length; i++){
            //     let eventListenerKey = this.currentUser.qr_code_detail[i].unique_key
            //     document.querySelector('#user-codes').children[i].classList.add('cursor-pointer')
            //     // document.querySelector('#user-codes').children[i].classList.add('scale-50')
            //     document.querySelector('#user-codes').children[i].addEventListener('click', function(){
            //         console.log('inside add event', eventListenerKey)
            //         // 'http://127.0.0.1:8000/template/0/' development url
            //         // 'https://linked-shirts.herokuapp.com/template/0/'
            //         window.location = 'http://127.0.0.1:8000/template/0/' + eventListenerKey
            //     })

            // }
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
        test1(id){
            console.log('test 1', id)
            axios({
                method: 'delete',
                url: '/api/v1/custom_urls/' + id,
                headers: {
                    'X-CSRFToken': this.csrfToken
                }
            }).then(response => {
                console.log('QR code deleted')
                this.loadCurrentUser()
            }).catch(error => {
              
                console.log('delete QR code errors', error.response)
            })

        },
        test4(){
            document.querySelector('#options-1').classList = 'flex justify-evenly flex-wrap w-full h-full border border-red-400'
            
        },
        styleQRCode(option){
            console.log('option', typeof option, option)
            document.querySelector('#canvas').innerHTML = ''
            if (option === 'dots'){
                this.dotOptionType = 'dots'
            }
            qrCode = this.createQRCode()
            qrCode.append(document.querySelector('#canvas'))


        },
        setDefaults(){
            this.dotOptionType = 'extra-rounded'
            this.dotOptionColor = '#6a1a4c'
            this.backgroundOptionColor = "#ffffff"
            this.cornersSquareOptionType = 'extra-rounded'
            this.cornersSquareOptionColor = "#000000"
            this.cornersDotOptionType = 'extra-rounded'
            this.cornersDotOptionColor = "#000000"
            this.userCodeImage = "/static/EmbeddedImage.png"
        },
        saveQRCode(){
            document.querySelector('#snap-test').style.display = 'none'
            axios({
                method: 'post',
                url: '/api/v1/custom_urls/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    'unique_key': this.randomKeyGenerator(),
                    'author': this.currentUser.id,
                    'dot_options_type': this.dotOptionType,
                    'dot_options_color': this.dotOptionColor,
                    'background_options_color': this.backgroundOptionColor,
                    'corner_square_options_type': this.cornersSquareOptionType,
                    'corner_square_options_color': this.cornersSquareOptionColor,
                    'corner_dot_options_type': this.cornersDotOptionType,
                    'corner_dot_options_color': this.cornersDotOptionColor,
                    'image': this.userCodeImage


                }
            }).then(response => {
                console.log(response.data)
                this.loadCurrentUser()
            }).catch(error => {
                console.log(error.response)
             
            })
        },
        createQRCode(){
            // 'http://127.0.0.1:8000/template/0/' development url
            // 'https://linked-shirts.herokuapp.com/template/0/'
            const qrCode = new QRCodeStyling({
                width: this.qrCodeSize,
                height: this.qrCodeSize,
                type: "canvas",
                data: this.websiteInput,
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
                this.makeQRCodeButtonCheck = this.currentUser.qr_code_detail.length
                this.displayUserQRCodes()
            }).catch(error => {
              
                console.log('load user errors', error.response)
            })
        },
        
        
            
    },
    created: function() {
        
        console.log('created')
    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
        this.loadCurrentUser()
        console.log('home mounted')

    }
})