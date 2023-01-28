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

            emergencyPhoneInputField: '',
            emergencyPhoneDescriptorInputField: '',

            emergencyAddressDescriptorInputField: '',
            emergencyAddressStreetField: '',
            emergencyAddressCityField: '',
            emergencyAddressStateField: '',
            emergencyAddressZipCodeField: '',


            // bools
            createNameBool: true,
            displayQRCodeBool: true,
            createPhoneBool: true,
            createAddressBool: true,

            // format phone variable
            currentPhones: [],
            formattedPhones: [],
            
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
                // console.log('test', document.querySelector('#page-key').innerHTML)
                pageKey = document.querySelector('#page-key').innerHTML
                for (i=0; i < this.gotQRCodes.length; i++){
                    // console.log('keys', this.gotQRCodes[i].unique_key)
                    if (this.gotQRCodes[i].unique_key === pageKey){
                        // console.log('SUCESSS', this.gotQRCodes[i])
    
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
                // console.log('key', typeof key, key)
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
                    this.emergencyNameDescriptorInputField = ''
                    this.emergencyNameInputField = ''
                    this.loadQRCodes()
        
                }).catch(error => {
              
                    console.log('create name errors', error.response)
                })

                nameInputDiv.style.display = 'none'
                nameButton.style.display = 'block'

            }
            this.createNameBool = !this.createNameBool
        },
        createPhone(key){
            let nameInputDiv = document.querySelector('#make-new-emergency-phone-div')
            let nameButton = document.querySelector('#new-emergency-phone-button')
            if (this.createPhoneBool){
                // console.log('true')
                nameInputDiv.style.display = 'block'
                nameButton.style.display = 'none'
                
            }
            else {
                // console.log('key', typeof key, key)
                axios({
                    method: 'post',
                    url: '/api/v1/emergency_phones/',
                    headers: {
                        'X-CSRFToken': this.csrfToken
                    },
                    data: {
                        descriptor: this.emergencyPhoneDescriptorInputField,
                        phone_number: '+1' + this.emergencyPhoneInputField,
                        qr_code: key
                    }
                }).then(response => {
                    console.log('posted', response)
                    
                    this.emergencyPhoneDescriptorInputField = ''
                    this.emergencyPhoneInputField = ''
                    this.loadQRCodes()
        
                }).catch(error => {
              
                    console.log('create phone errors', error.response)
                })
                nameInputDiv.style.display = 'none'
                nameButton.style.display = 'block'

            }
            this.createPhoneBool = !this.createPhoneBool
        },
        createAddress(key){
            let nameInputDiv = document.querySelector('#make-new-emergency-address-div')
            let nameButton = document.querySelector('#new-emergency-address-button')
            if (this.createAddressBool){
                // console.log('true')
                nameInputDiv.style.display = 'block'
                nameButton.style.display = 'none'
                
            }
            else {
                // console.log('key', typeof key, key)
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
                        qr_code: key
                    }
                }).then(response => {
                    console.log('posted', response)
                    
                    this.emergencyPhoneDescriptorInputField = ''
                    this.emergencyPhoneInputField = ''
                    this.loadQRCodes()
        
                }).catch(error => {
              
                    console.log('create phone errors', error.response)
                })
                nameInputDiv.style.display = 'none'
                nameButton.style.display = 'block'

            }
            this.createAddressBool = !this.createAddressBool
        },
        loadCurrentUser(){
            // console.log('lets gooo')
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
                this.storePhones()
                
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
        storePhones(){
            // loop through qr codes and grab the phone numbers of the current page and store them in variable
            pageKey = document.querySelector('#page-key').innerHTML
            for (let i=0; i < this.gotQRCodes.length; i++){
                if (this.gotQRCodes[i].unique_key == pageKey){
                    for (let x=0; x < this.gotQRCodes[i].phone_detail.length; x++){
                        this.currentPhones.push(this.gotQRCodes[i].phone_detail[x].phone_number)
                    }
                    
                }
            }
            this.formatPhones()
        },
        formatPhones(){
            // loop though the current phones, then loop though the individual phone string.
            // build a formatted string as you do so and then store it in a new variable to loop through on the dom. 
            // console.log('current phones', this.currentPhones)
            let new_string_build = ''
            for (let i=0; i < this.currentPhones.length; i++){
                new_string_build = '('
                // console.log('currnet stringlength', this.currentPhones[i].length)
                for (let x=0; x < this.currentPhones[i].length; x++){
                    // console.log(this.emergencyPhones[i].phone_number[x])
                    if (x > 1){
                        new_string_build += this.currentPhones[i][x]
                    }
                    if (x == 4){
                        new_string_build += ') '
                    }
                    if (x == 7){
                        new_string_build += '-'
                    }
                }
                this.formattedPhones.push(new_string_build)
            }
            console.log('emergency phone format', this.formattedPhones)


        },
        deleteEmergency(url, id){
            
            axios({
                method: 'delete',
                url: '/api/v1/' + url + id,
                headers: {
                    'X-CSRFToken': this.csrfToken
                }
            }).then(response => {
                console.log('name deleted')
                this.loadQRCodes()
            })
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