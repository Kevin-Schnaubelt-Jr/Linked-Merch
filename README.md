![test](linkmerchsplash.png)

## Project Overview

This website will allow users to purchase items (cloths, stickers, etc.) and with those items will be generated a unique QR code associated with that user. The website will generate a page associated with that QR code with a chosen template that the user will be able to access and edit in order to share it with others. When a user makes subsequent purchases, they can use one of their previous QR codes or generate more. The user will have a limit to how many QR codes they can make, but can edit their pages at will. The website will achieve this via Django's dynamic URL patterns. The website will use be using Vue with Django REST framework.

## Functionality

The user will be brought to their profile on sign up, and from there, they will generate a QR code with a chosen template. After which, they can browse the store and, before checkout, assign a QR code to that purchase.

## Data Model

The users model will need a model for storing the user's QR codes, as well as everything that goes with purchases (i.e purchase history). There will also need to be a model for admin to access what was purchases, by who, and with what QR code (unique site url) in order to integrate it into the order.

## Schedule

the First milestone will be a demo showing the ability to create custom QR codes with a user system, as well as the first initial template, which will just be emergency contact information.
