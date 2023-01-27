const emergency = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            currentUser: {},
            csrfToken: '',
            gotQRCodes: [],

            // QR code creation params
            websiteInput: 'https://linked-shirts.herokuapp.com/',
            qrCodeSize: 300,
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

            // create variables
            emergencyNameInputField: '',
            emergencyNameDescriptorInputField: '',


            // bools
            createNameBool: true,
            displayQRCodeBool: true,

            // format phone variable
            currentPhones: [],
            
        }
    },
    methods: {
        test(){
            console.log('test')
            newButton = document.createElement('button')
            newButton.innerHTML = 'BUTTON!'
            newButton.addEventListener('click', function(){
                this.test2()
            }.bind(this))
            document.querySelector('#test-div').append(newButton)
        },
        test2(){
            console.log('test 2')
        },
        displayQRCode(){
            if (this.displayQRCodeBool){
                console.log('test', document.querySelector('#page-key').innerHTML)
                pageKey = document.querySelector('#page-key').innerHTML
                for (i=0; i < this.gotQRCodes.length; i++){
                    console.log('keys', this.gotQRCodes[i].unique_key)
                    if (this.gotQRCodes[i].unique_key === pageKey){
                        console.log('SUCESSS', this.gotQRCodes[i])
    
                        this.dotOptionType = this.gotQRCodes[i].dot_options_type
                        this.dotOptionColor = this.gotQRCodes[i].dot_options_color
                        this.backgroundOptionColor = this.gotQRCodes[i].background_options_color
                        this.cornersSquareOptionType = this.gotQRCodes[i].corner_square_options_type
                        this.cornersSquareOptionColor = this.gotQRCodes[i].corner_square_options_color
                        this.cornersDotOptionType = this.gotQRCodes[i].dot_options_type
                        this.cornersDotOptionColor = this.gotQRCodes[i].dot_options_color
                        this.userCodeImage = this.gotQRCodes[i].image
    
                    // 'http://127.0.0.1:8000/template/0/' development url
                    // 'https://linked-shirts.herokuapp.com/template/0/'
                    // CAN STAY DEPLOYED LINK
                    this.websiteInput = 'https://linked-shirts.herokuapp.com/template/0/' + pageKey
                    }
                }
                qrCode = this.createQRCode()
                qrCode.append(document.querySelector('#canvas'))
                this.displayQRCodeBool = false
            }

            
        },
        createName(key){
            let nameInputDiv = document.querySelector('#make-new-emergency-name-div')
            let nameButton = document.querySelector('#new-emergency-name-button')
            if (this.createNameBool){
                console.log('true')
                nameInputDiv.style.display = 'block'
                nameButton.style.display = 'none'
                
            }
            else {
                console.log('key', typeof key, key)
                axios({
                    method: 'post',
                    url: '/api/v1/emergency_names/',
                    headers: {
                        'X-CSRFToken': this.csrfToken
                    },
                    data: {
                        descriptor: this.emergencyNameDescriptorInputField,
                        name: this.emergencyNameInputField,
                        qr_code: key
                    }
                }).then(response => {
                    console.log('posted', response)
                    nameInputDiv.style.display = 'none'
                    nameButton.style.display = 'block'
                    this.emergencyNameDescriptorInputField = ''
                    this.emergencyNameInputField = ''
                    this.loadQRCodes()
        
                }).catch(error => {
              
                    console.log('create name errors', error.response)
                })

            }
            this.createNameBool = !this.createNameBool
        },
        loadCurrentUser(){
            console.log('lets gooo')
            axios({
                method: 'get',
                url: '/users/currentuser/'
            }).then(response => {
                this.currentUser = response.data
                console.log('emergency current user', this.currentUser)
            }).catch(error => {
              
                console.log(error.response)
            })
        },
        loadQRCodes(){
            axios({
                method: 'get',
                url: '/api/v1/custom_urls/'
            }).then(response => {
                this.gotQRCodes = response.data
                console.log('get QR codes', this.gotQRCodes)
                this.displayQRCode()
                this.formatPhones()
                
                }
            ).catch(error => {
    
                console.log('get QR errors', error.response)
             
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
        formatPhones(){
            // this.currentPhones
            pageKey = document.querySelector('#page-key').innerHTML
            console.log('format key', document.querySelector('#page-key').innerHTML)
            console.log('fuck', this.gotQRCodes)
            for (let i=0; i < this.gotQRCodes.length; i++){
                console.log('loopin', this.gotQRCodes[i].unique_key)
                if (this.gotQRCodes[i].unique_key == pageKey){
                    for (let x=0; x < this.gotQRCodes[i].phone_detail.length; x++){
                        // console.log('in loop', this.gotQRCodes[i].phone_detail[x])
                        this.currentPhones.push(this.gotQRCodes[i].phone_detail[x].phone_number)
                    }
                    console.log('phone list', typeof this.currentPhones, this.currentPhones)
                    

                }
            }

        }
    },
    created: function() {

    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
        this.loadCurrentUser()
        this.loadQRCodes()

        console.log('emergency mounted')

    }
})