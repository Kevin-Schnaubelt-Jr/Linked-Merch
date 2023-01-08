const home = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            currentUser: {},
            csrfToken: '',
            websiteInput: 'youtube.com',
            newQRCodes: {},
            blobHold: 0,
            
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
            const qrCode = new QRCodeStyling({
                width: 300,
                height: 300,
                type: "svg",
                data: "https://www.facebook.com/",
                image: "",
                dotsOptions: {
                    color: "#4267b2",
                    type: "rounded"
                },
                backgroundOptions: {
                    color: "#e9ebee",
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: 20
                }
            });
        
            qrCode.append(document.getElementById("canvas"));
            qrCode.download({ name: "qr", extension: "svg" });
        },
        postNEWQRCode(){
            console.log('from test', this.blobHold)
            axios({
                method: 'post',
                url: '/api/v1/newURLs/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    "unique_key" : this.randomKeyGenerator(),
                    "blob_file": this.blobHold,
                    "author": this.currentUser.id,
                }
            }).then( response => {
                this.loadCurrentUser()
                console.log(response.data)
            }).catch(error => {
                console.log(error.response)
             
            })
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
        loadQRCodes(){
            axios({
                method: 'get',
                url: '/api/v1/newURLs/'
            }).then(response => {
                this.newQRCodes = response.data
                console.log('get QR codes', response.data)
                
                }
            ).catch(error => {
    
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
            
        },
        codemonkeyAPICall(){
            // 'http://127.0.0.1:8000/template/0/' development url
            // 'https://linked-shirts.herokuapp.com/template/0/'
            axios({
                method: 'get',
                url: 'https://qrcode-monkey.p.rapidapi.com/qr/custom',
                responseType: 'blob',
                params: {
                    data: this.websiteInput,
                    config: `{"bodyColor": "", "body":"circle", "eye":"frame6", 
                    "eyeBall":"ball6"}`,
                    download: 'false',
                    file: 'png',
                    size: 300
                },
                headers: {
                    'X-RapidAPI-Key': '5559576162mshf44aea9d971363dp160f38jsn0f074a06d8d0',
                    'X-RapidAPI-Host': 'qrcode-monkey.p.rapidapi.com'
                    },
            }).then(response => {
                console.log('QR api data',response.data)
                let magicUrl = URL.createObjectURL(response.data)
                console.log(document.querySelector('#qr-img').src)
                
                document.querySelector('#qr-img').src = magicUrl
                this.blobHold = response.data
                console.log('blob hold',typeof this.blobHold, this.blobHold)
                
                
            })
        }
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