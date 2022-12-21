
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
            emergencyNameDescriptorInputField: '',

            emergencyPhones: [],
            emergencyPhonesFormat: [],
            emergencyPhoneInputField: '',
            emergencyPhoneDescriptorInputField: '',

            emergencyAddresses: [],
            emergencyAddressDescriptorInputField: '',
            emergencyAddressStreetField: '',
            emergencyAddressCityField: '',
            emergencyAddressStateField: '',
            emergencyAddressZipCodeField: '',

            transitionInt: 0,
            transitionBool: false,
            transitionEnter: true,
            getQRdisabler: false,

            

            // QR api call variables
            uniqueKeyHold: '',
            qrBodyStyle: "circle",
            qrEyeStyle: 'frame6',
            qrEyeBallStyle: 'ball6',
            qrbodyColor: '#000000',
            qrbgColor: '#FFFFFF',
            qreye1Color: '#000000',
            qreye2Color: '',
            qreye3Color: '',
            qreyeBall1Color: '#000000',
            qreyeBall2Color: '',
            qreyeBall3Color: '',
            // array of colors
            bgColorsCounter: 0,
            bgColors: [
                '#E6B0AA','#D2B4DE','#AED6F1', '#A9DFBF', '#F9E79F', '#EDBB99',
                '#FFFFFF',
            ],
            bodyColorsCounter: 0,
            frameColorsCounter: 0,
            ballColorsCounter: 0,
            bodyColors: [
                '#641E16', '#4A235A', '#1B4F72', '#145A32', '#7D6608', '#6E2C00',


                // black
                '#000000'
            ],
            qrBodyStylesListCounter: 2,
            qrBodyStylesList: [
                'square', 'circle', 'circular', 'japnese', 'pointed-edge-cut', 'pointed-smooth',
                'rounded-in-smooth', 'diamond', 'mosaic', 'circle-zebra', 'edge-cut', 'leaf',
                'pointed-in', 'round', 'rounded-pointed', 'dot', 'circle-zebra-vertical', 
                'edge-cut-smooth', 'pointed', 'pointed-in-smooth', 'rounded-in', 'star'
            ],
            qrFrameCounter: 7,
            qrBallCounter: 7,
            

        }
    },
    computed: {
        reversedMessage: function () {
            // `this` points to the vm instance
            return this.message.split('').reverse().join('')
          }
    },
    methods: {
        loadUrls(){
            axios({
                method: 'get',
                url: '/api/v1/custom_urls/'
            }).then(response => {
                this.urls = response.data
                console.log('get urls', response.data)
                
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
                    "unique_key" : this.uniqueKeyHold,
                    "template_key": 0,
                    "body_style": this.qrBodyStyle,
                    "eye_style": this.qrEyeStyle,
                    "eye_ball_style": this.qrEyeBallStyle,
                    "body_color": this.qrbodyColor,
                    "bg_color": this.qrbgColor,
                    "eye_1_color": this.qreye1Color,
                    "eye_ball_1_color": this.qreyeBall1Color,
                    "author": this.currentUser.id,
                }
            }).then( response => {
                this.loadCurrentUser()
                console.log(response.data)
                this.transitionInt = 0
                this.transitionBool = false
            }).catch(error => {
                console.log(error.response)
             
            })

        },
        deleteUrl(id){
            if (true){
                axios({
                    method: 'delete',
                    url: '/api/v1/custom_urls/' + id,
                    headers: {
                        'X-CSRFToken': this.csrfToken
                    }
                }).then(response => {
                    console.log('url deleted')
                    this.loadCurrentUser()
                })

            }
        },
        loadCurrentUser(){
            axios({
                method: 'get',
                url: '/users/currentuser/'
            }).then(response => {
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
        loadPhones(){
            axios({
                method: 'get',
                url: '/api/v1/emergency_phones/'
            }).then(response => {
                this.emergencyPhones = response.data
                console.log('emergency phones', this.emergencyPhones)
                this.formatPhones()
                
            }).catch(error => {
                
                console.log(error.response)
             
            })
       

        },
        loadAddresses(){
            axios({
                method: 'get',
                url: '/api/v1/emergency_address/'
            }).then(response => {
                this.emergencyAddresses = response.data
                console.log('emergency addresses', this.emergencyAddresses)
                
                
            }).catch(error => {
                
                console.log(error.response)
             
            })
        },
        formatPhones(){
            let new_string_build = ''
            // console.log('seein for the for', this.emergencyPhones[0].phone_number)
            for (let i=0; i < this.emergencyPhones.length; i++){
                new_string_build = '('
                this.emergencyPhones[i].phone_number
                for (let x=0; x < this.emergencyPhones[i].phone_number.length; x++){
                    // console.log(this.emergencyPhones[i].phone_number[x])
                    if (x > 1){
                        new_string_build += this.emergencyPhones[i].phone_number[x]
                    }
                    if (x == 4){
                        new_string_build += ') '
                    }
                    if (x == 7){
                        new_string_build += '-'
                    }
                }
                this.emergencyPhones[i]["formatted_phone"] = new_string_build
                

                // console.log('string thing', new_string_build)
                // this.emergencyPhonesFormat.push(new_format_object)
            }
            console.log('emergency phone format', this.emergencyPhonesFormat)
            
        },
        getQRcode(type, index, url, editId){
            if (this.getQRdisabler){
                return
            }
            console.log('url', typeof url, url)
            console.log('type', typeof type, type)
            
            let bodyStyle = 'circle'
            let eyeStyle = 'frame6'
            let eyeBallStyle = 'ball6'
            let bodyColor = ''
            let bgColor = ''
            let eye1Color = ''
            let eyeBall1Color = ''

            
        
            
            // type zero comes from initial page print, and type 3 is from emergency
            if (type === 0 || type === 3){
                sizeParam = '100'
                uniqueKey = url.unique_key
                bodyStyle = url.body_style
                eyeStyle = url.eye_style
                bodyColor = url.body_color
                bgColor = url.bg_color
                eye1Color = url.eye_1_color
                eyeBall1Color = url.eye_ball_1_color
                if (type === 3){
                    sizeParam = '200'
                }
            }
            //type 1 is create a qr code
            if(type === 1){
                if (this.transitionEnter){
                    sizeParam = '200'
                    this.uniqueKeyHold = this.randomKeyGenerator()
                    uniqueKey = this.uniqueKeyHold
                    console.log('new key', typeof uniqueKey, uniqueKey)
                    this.transitionEnter = !this.transitionEnter
                }
                else {
                    this.transitionEnter = !this.transitionEnter
                    // return
                }
            }
            // type 2 editing the QR code style
            if (type === 2){
                uniqueKey = this.uniqueKeyHold
                // bodyStyle = this.qrBodyStylesList[this.qrBodyStylesListCounter]
                // this.qrBodyStyle = bodyStyle
                // this.qrBodyStylesListCounter++
                // console.log('body style', this.qrBodyStyle)
                editArray = this.editQRcode(editId)
                console.log(editArray)
                bodyStyle = editArray[0]
                eyeStyle = editArray[1]
                eyeBallStyle = editArray[2]
                bodyColor = editArray[3]
                bgColor = editArray[4]
                eye1Color = editArray[5]
                eyeBall1Color = editArray[6]
            }
            // 'http://127.0.0.1:8000/template/0/' development url
            // 'https://linked-shirts.herokuapp.com/template/0/'
            axios({
                method: 'get',
                url: 'https://qrcode-monkey.p.rapidapi.com/qr/custom',
                responseType: 'blob',
                params: {
                    data: 'https://linked-shirts.herokuapp.com/template/0/' + uniqueKey,
                    config: `{"bodyColor": "", "body":"${bodyStyle}", "eye":"${eyeStyle}", 
                    "eyeBall":"${eyeBallStyle}", "bodyColor":"${bodyColor}", "bgColor": "${bgColor}",
                    "eye1Color": "${eye1Color}", "eye2Color": "${eye1Color}", "eye3Color": "${eye1Color}", "eyeBall1Color": "${eyeBall1Color}", "eyeBall2Color":"${eyeBall1Color}", "eyeBall3Color":"${eyeBall1Color}"}`,
                    download: 'false',
                    file: 'png',
                    size: sizeParam
                },
                headers: {
                    'X-RapidAPI-Key': '5559576162mshf44aea9d971363dp160f38jsn0f074a06d8d0',
                    'X-RapidAPI-Host': 'qrcode-monkey.p.rapidapi.com'
                    },
            }).then(response => {
                console.log('QR api data',response.data)
                let magicUrl = URL.createObjectURL(response.data)
                if (type === 0){
                    document.querySelector('#qr-img'+ index).src = magicUrl
                    console.log('tried to print qr codes in home')
                }
                if (type === 3){
                    document.querySelector('#emergency-qr-img').src = magicUrl
                    this.getQRdisabler = true
                }
                document.querySelector('#qr-builder-img').src = magicUrl
                document.querySelectorAll('.edit-qr-buttons').forEach(element => {
                    element.disabled = false
                })
                
            })
        
        },
        editQRcode(id){
            // enable the getQRcode function
            document.querySelectorAll('.edit-qr-buttons').forEach(element => {
                element.disabled = true
            })
            console.log('editQRcode', typeof id, id)
            // body style changes
            if(id === 1){
                this.qrBodyStyle = this.qrBodyStylesList[this.qrBodyStylesListCounter]
                this.qrBodyStylesListCounter++
                if (this.qrBodyStylesListCounter === (this.qrBodyStylesList.length)){
                    this.qrBodyStylesListCounter = 0
                }
            }
            // frame changer
            if(id === 2){
                this.qrEyeStyle = 'frame' + this.qrFrameCounter
                this.qrFrameCounter++
                if(this.qrFrameCounter == 17){
                    this.qrFrameCounter = 0
                }
            }
            // inner ball changer
            if(id === 3){
                this.qrEyeBallStyle = 'ball' + this.qrBallCounter
                this.qrBallCounter++
                if(this.qrBallCounter == 20){
                    this.qrFrameCounter = 0
                }
            }
            // body color changer
            if(id === 4){
                this.qrbodyColor = this.bodyColors[this.bodyColorsCounter]
                this.bodyColorsCounter++
                if(this.bodyColorsCounter === this.bodyColors.length){
                    this.bodyColorsCounter = 0
                }
            }
            // change background
            if(id === 5){
                this.qrbgColor = this.bgColors[this.bgColorsCounter]
                this.bgColorsCounter++
                if(this.bgColorsCounter === this.bgColors.length){
                    this.bgColorsCounter = 0
                }
            }
            // change frame color
            if(id === 6){
                this.qreye1Color = this.bodyColors[this.frameColorsCounter]
                this.frameColorsCounter++
                if(this.frameColorsCounter === this.bodyColors.length){
                    this.frameColorsCounter = 0
                }

            }
            // change eye color
            if(id === 7 ){
                this.qreyeBall1Color = this.bodyColors[this.ballColorsCounter]
                this.ballColorsCounter++
                if(this.ballColorsCounter === this.bodyColors.length){
                    this.ballColorsCounter = 0
                }
            }
            qrArray = [this.qrBodyStyle, this.qrEyeStyle, this.qrEyeBallStyle, this.qrbodyColor, this.qrbgColor, this.qreye1Color, this.qreyeBall1Color]
            return qrArray
        },
        transition1(){
            this.transitionInt += 1
            this.transitionBool = !this.transitionBool
            
            
            
        },
        test(){
            console.log(this.uniqueKeyHold ,this.qrBodyStyle, this.qrEyeStyle, this.qrEyeBallStyle, this.qrbodyColor, this.qrbgColor, this.qreye1Color, this.qreyeBall1Color)
        },
        test2(index){
            console.log('here', index)
            // return 'https://i.imgur.com/TvmAlr9.jpeg'
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
                this.emergencyNameDescriptorInputField = ''
                this.emergencyNameInputField = ''
    
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
                console.log('name deleted')
                this.loadUrls()
            })
        },

        // EMERGENCY PHONE CRUD
        newPhoneInputFieldReveal(){
            document.querySelector('#new-emergency-phone-button').style.display = "none"
            document.querySelector('#make-new-emergency-phone-div').style.display = 'block'
            console.log('new input field')
        },
        createPhoneNumber(){
            axios({
                method: 'post',
                url: '/api/v1/emergency_phones/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    descriptor: this.emergencyPhoneDescriptorInputField,
                    phone_number: '+1' + this.emergencyPhoneInputField,
                    url: parseInt(document.querySelector('#page-key').innerHTML)
                }
            }).then(response => {
                console.log('phone created')
                this.loadPhones()
                document.querySelector('#new-emergency-phone-button').style.display = "block"
                document.querySelector('#make-new-emergency-phone-div').style.display = 'none'
            })
        },
        deletePhoneNumber(id){
            axios({
                method: 'delete',
                url: '/api/v1/emergency_phones/' + id,
                headers: {
                    'X-CSRFToken': this.csrfToken
                }
            }).then(response => {
                console.log('phone deleted')
                this.loadPhones()
            })
        },

        // EMERGENCY ADDRESS CRUD
        newAddressInputFieldReveal(){
            document.querySelector('#new-emergency-address-button').style.display = "none"
            document.querySelector('#make-new-emergency-address-div').style.display = 'block'
            console.log('new input field')
        },
        createAddress(){
            axios({
                method: 'post',
                url: '/api/v1/emergency_address/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    descriptor: this.emergencyAddressDescriptorInputField,
                    street: this.emergencyAddressStreetField,
                    city: this.emergencyAddressCityField,
                    state: this.emergencyAddressStateField,
                    zip_code: this.emergencyAddressZipCodeField,
                    url: parseInt(document.querySelector('#page-key').innerHTML)
                }
            }).then(response => {
                console.log('address created')
                this.loadAddresses()
                this.loadUrls()
                document.querySelector('#new-emergency-address-button').style.display = "block"
                document.querySelector('#make-new-emergency-address-div').style.display = 'none'
            })
        },
        deleteAddress(id){
            axios({
                method: 'delete',
                url: '/api/v1/emergency_address/' + id,
                headers: {
                    'X-CSRFToken': this.csrfToken
                }
            }).then(response => {
                console.log('address deleted')
                this.loadAddresses
                this.loadUrls()
            })
        }
    },
    created: function() {
        this.loadCurrentUser()
        this.loadUrls()
        this.loadNames()
        this.loadPhones()
        this.loadAddresses()
        console.log('created')
   
         
    },


    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
        console.log('MOUNTED')
        
        
       
    }
})