## Project Overview

This website will allow users to purchase items (cloths, stickers, etc.) and with those items will be gnereated a uniqie QR code asccoated with that user. The website will generate a page asscotoated with that QR code with a chosen template that the user will be able to access and edit, in order to share it with others. When a user makes subesquent purchaes, they can use one of their previous QR codes are generate a new one. The website will achiveve this via Django's dynamic URL patterns, and the website will use be using Vue with Django REST framework.

## Functionality

The user will be brought to their profile on sign up, and from there, they will generate a QR code with a chosen template. Afterwhich, they can browse the store, and before checkout they asign a QR code to a purchase. 

## Data Model

The users model will need a model for storing QR codes, as well as eveything that goes with purchases (i.e purchase history). There will also need to be a model for admin to access what was purchases, by who, and with what QR code (unqie site url).

## Schedule

First milestone will be a demo showing the ability to create custom QR codes with a user system, as well as the first intial template, which will just be emergency contact information. 
