
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

            message: 'Hello',
            srcVariable: '',
            // QR api call variables
            qrBodyStyle: "mosaic",
            qrEyeStyle: 'frame6',
            qrEyeBallStyle: 'ball6',
            qrbodyColor: '#0F52BA',
            qrbgColor: '#c5e6fc',
            qreye1Color: '#2B3784',
            qreye2Color: '',
            qreye3Color: '',
            qreyeBall1Color: '',
            qreyeBall2Color: '',
            qreyeBall3Color: ''
            

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
                this.loadCurrentUser()
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
                    "unique_key" : this.randomKeyGenerator(),
                    "template_key": this.newUrl.template_key,
                    "author": this.currentUser.id,
                }
            }).then( response => {
                this.loadUrls()
                console.log(response.data)
            }).catch(error => {
                console.log(error.response)
             
            })

        },
        deleteUrl(id){
            if (id > 3){
                axios({
                    method: 'delete',
                    url: '/api/v1/custom_urls/' + id,
                    headers: {
                        'X-CSRFToken': this.csrfToken
                    }
                }).then(response => {
                    console.log('url deleted')
                    this.loadUrls()
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
        getQRcode(){
            
            axios({
                method: 'get',
                url: 'https://qrcode-monkey.p.rapidapi.com/qr/custom',
                responseType: 'blob',
                params: {
                    data: 'http://127.0.0.1:8000/template/0/0kzjyprPzJotBXNx9aBt',
                    config: `{"bodyColor": "", "body":"${this.qrBodyStyle}", "eye":"${this.qrEyeStyle}", 
                    "eyeBall":"${this.qrEyeBallStyle}", "bodyColor":"${this.qrbodyColor}", "bgColor": "${this.qrbgColor}",
                    "eye1Color": "${this.qreye1Color}", "eye2Color": "${this.qreye1Color}", "eye3Color": "${this.qreye1Color}", "eyeBall1Color": "${this.qreyeBall1Color}", "eyeBall2Color":"${this.qreyeBall1Color}", "eyeBall3Color":"${this.qreyeBall1Color}"}`,
                    download: 'false',
                    file: 'png',
                    size: '200'
                },
                headers: {
                    'X-RapidAPI-Key': '5559576162mshf44aea9d971363dp160f38jsn0f074a06d8d0',
                    'X-RapidAPI-Host': 'qrcode-monkey.p.rapidapi.com'
                    },
            }).then(response => {
                console.log('QR api data',response.data)
                let magicUrl = URL.createObjectURL(response.data)
                document.querySelector('#qr-builder-img').src = magicUrl
            })
        
        },
        test(){
            this.transitionInt += 1
            this.transitionBool = !this.transitionBool
            
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