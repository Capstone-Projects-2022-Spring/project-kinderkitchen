### project-kinderkitchen
# Project Abstract:

It's a mobile application, Kinder Kitchen, to help users combat food waste in their own homes. Kinder Kitchen allows users to track the expiration dates of their food to lower the amount of food waste they produce. Users will be able to scan the barcode located on the food’s packaging or enter the information manually. The app will help the user categorize the food they enter and show when each food expires. Users can receive notifications on food that is expiring soon within a set amount of time. Kinder Kitchen will also search the internet for recipes that utilize the food you have entered so that users can get creative with what they have on hand. In addition, Kinder Kitchen will help users locate local food banks to donate unused food if they are unable to use it in time


# High Level Requirement:
Upon launching the Kinder Kitchen app, the user will be prompted to login or sign up for an account. This allows the system to store account information for later use. Kinder Kitchen will then direct the user to the home page. Here, they will see categories for different food storage places in their kitchen. “Fridge” and “Pantry” will be default categories to get users started. Additionally, there will be a customization option to add more or edit categories so that the user can customize it to be like their kitchen. Within each category, the food entered by the user via barcode scan or manual entry will be listed by order of expiration date. Food that will expire the soonest will be listed at the top. There could be a color-coding system to distinguish expiration dates like red meaning past expiration, yellow meaning expiring in a few days, and green meaning the user has a week or longer. The user can customize notifications in the settings of the app to change when the app notifies them about food expiring. Another main feature of the app will be the ‘Recipes’ section. Kinder Kitchen will search the internet for recipes that include ingredients that the user has already entered into the app. Kinder Kitchen can match recipes based on how many ingredients the user already has or based on the foods that are going to expire the soonest. The user can save the recipes so they can look at them later. There will also be a ‘Resources’ section to local food banks based on current location or an entered zip code. The app will show the food banks within a certain distance of their location.


# Conceptual Design:
Kinder Kitchen will be developed using React Native and JavaScript so that it can be available on Android and iOS platforms as a mobile application. It will also integrate an SQL database (MongoDB or AWS) to allow data storage for search queries. The app will also utilize the Spoonacular API to map food ingredients to recipes, as well as a Maps/Google Search API to connect the user to local food banks. 


# Team Members:
1- Sophia E Szczepanek

2- Hunter Lautenbacher

3- Dom Arishi

4- Alex Thompson

5- Ricky Zhou

6- Matt Stasiak



## Client Install
1) Download Expo Go on your mobile device ([External Site](https://expo.dev/client)
2) Navigate to our project on Expo's Site ([External Site](https://expo.dev/@kinderkitchen)
  - Desktop:
    - Click OPEN
    - Scan QR Code with your mobile device
 - Mobile Device: 
    - Click 'Open In Expo Go'

please Follow our testing guide [here](https://github.com/Capstone-Projects-2022-Spring/project-kinderkitchen/edit/ReadMe/README.md#testing-1) 

If there are difficulties, Scan this QR Code to gain access 

![image](https://user-images.githubusercontent.com/60050903/158704139-75985964-b0d8-4890-8c02-88602d0b7a9d.png) 

## Developer Install
*Work In Progress to get docker to handle a container with all installations*

- Install Node JS 16.13.0 LTS ([External Site](https://nodejs.org/en/))
- Install Android Studio [External Site](https://developer.android.com/studio)
  - Create Virtual Device
- Install XCode
- Download Expo Go App
- Download Dependencies ([More Details])
*Command Line*
```
npm install -g expo-cli
npm install react-native-gesture-handler
npm install date-fns --save
npm install react-native-dropdown-picker
expo install expo-barcode-scanner
```
- Clone Repo
```
cd Desktop
git clone https://github.com/Capstone-Projects-2022-Spring/project-kinderkitchen
```
## Open & Run 
- Recommemded IDE: [Visual Studio Code](https://code.visualstudio.com/download)
### Open Source Code
- Navigate to Cloned Repository Direcctory
- Utilize VS Code 
```
cd Capstone-Projects-2022-Spring/project-kinderkitchen/kinderkitchen
code .
```
Go to view in VS Code, open CMD and run ```npm start```
To view in Expo Go, run ```expo start``` 
Scan the QR Code that it generates and open the app with Expo Go

## Milestone 1 Demo  
- F1 User can create an account with Kinder Kitchen 
  - Sign Up will validate first name, last name, 
    email, address. 
- F2  User can manage food items  
  - add/edit/delete categories 
  - add/edit/delete items 
  - manually add items 
  - scan barcodes to add items 
  - change quantity and details (expirations, 
    etc.) of each item 
  - move items between categories 

## Testing 1 

### Test 1:
- User Accounts:
  - Actions/Steps
    - Click Sign Up 
    - Enter Username, Password, Confirm Password, Email, and Zip Code
  - Expected Results
    - The user is able to enter the app upon putting in their credentials.
### Test 2:
- Personal Categorization Ingredient Storage:
  - Actions/Steps
    - Click Add Category and enter new category name
    - Add items to category
    - Edit category name
    - Delete category
  - Expected Results
    - The user is able to add, edit, and delete categories with each change displaying on         their home screen as well as add items to an existing category.
### Test 3: 
- Multi-Method Ingredient Entry:
  - Actions/Steps
    - Click Add Item button located within a selected category 
    - Enter in the name of the ingredient, the quantity, and its expiration/best by date
    - Scan item via barcode scan and verify correct information
    - Select category to place the ingredient
    - Edit ingredient
    - Delete ingredient
  - Expected Results
    - The user can add an item via manual entry or barcode scan. The user can select an         existing category and see it displayed in the correct category. The user can add,         edit, and delete the ingredient and the application will display the changes               accordingly.

