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

1. Download Expo Go on your mobile device ([External Site](https://expo.dev/client)
2. Navigate to our project on Expo's Site ([External Site](https://expo.dev/@kinderkitchen)

- Desktop:
  - Click OPEN
  - Scan QR Code with your mobile device
- Mobile Device:
  - Click 'Open In Expo Go'

please Follow our testing guide [here](https://github.com/Capstone-Projects-2022-Spring/project-kinderkitchen/edit/ReadMe/README.md#testing-1)

If there are difficulties, Scan this QR Code to gain access. 
Android users should have no issues. If you are using iOS please sign in with KinderKitchen Expo account. 
Let the them know if you are using iOS and need assistance.

![image](https://user-images.githubusercontent.com/60050903/158704139-75985964-b0d8-4890-8c02-88602d0b7a9d.png)

## Developer Install

_Work In Progress to get docker to handle a container with all installations_

- Install Node JS 16.13.0 LTS ([External Site](https://nodejs.org/en/))
- Install Android Studio [External Site](https://developer.android.com/studio)
  - Create Virtual Device
- Install XCode
- Download Expo Go App
- Download Dependencies ([More Details])
  _Command Line_

```
npm install -g expo-cli
npm install react-native-gesture-handler
npm install date-fns --save
npm install react-native-dropdown-picker
expo install expo-barcode-scanner
expo install firebase
expo install @react-native-firebase/app
expo install @react-native-firebase/auth
expo install @react-native-firebase/database
expo install react-native-paper
npm i react-native-google-places-autocomplete
expo install react-native-maps
expo install expo-location
npm i react-native-elements
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

Go to view in VS Code, open CMD and run `npm start`
To view in Expo Go, run `expo start`
Scan the QR Code that it generates and open the app with Expo Go

## v1.0 Release Notes

- Full navigation through app.
- Add and delete categories.
- Add and delete items.
- Manually add items.
- Added barcode scanner.
- Application available on android and iOS devices.

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
    - The user is able to add, edit, and delete categories with each change displaying on their home screen as well as add items to an existing category.

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
    - The user can add an item via manual entry or barcode scan. The user can select an existing category and see it displayed in the correct category. The user can add, edit, and delete the ingredient and the application will display the changes accordingly.

## v2.0 Release Notes

```
https://github.com/Capstone-Projects-2022-Spring/project-kinderkitchen/tree/v2.0
```

- Storing new user and verifying user login
- Storing user data and saving info for logins (add/deleting items and categories)
- Recipe API connection using Edamam API
- Search recipe functionality
- Bug fixes for navigation bar
- Color coding for expiration date

## Testing 2

### Test 1:

- User Accounts:
  - Actions/Steps
    - Attempt to login before creating account
    - Click Sign Up
    - Enter Email, Password, and Confirm Password and Click Sign Up
    - Navigate to Account Screen and press the logout button
    - Attempt to log into the account that was just created
  - Expected Results
    - The user should not be able to log into an account without first signing up. The user, upon sign up, should be taken to the home screen if they used an email that was not previously used. The user should be able to log out of the account and log back in with the email and password that they used to sign up.

### Test 2:

- Personal Categorization Ingredient Storage:
  - Actions/Steps
    - Delete category using new icon
  - Expected Results
    - The user should be able to delete a category. The user, at this moment due to a bug, must log out and log in to the same account to see the change on the home screen.

### Test 3:

- Recipe Recommendation Based on Ingredients
  - Actions/Steps
    - Navigate to Recipes screen via navigation bar
    - Use search bar to search for a recipe name or ingredient(s)
    - Recipes will populate screen based off search
    - Click "More About Recipe" button (Android) or text (iPhone)
  - Expected Results
    - The user should be able to find recipes based on searching the recipe name or ingredient(s). The user can click on the recipe and view the instructions and nutrition information through their browser.

## v3.0 Release Notes
```
https://github.com/Capstone-Projects-2022-Spring/project-kinderkitchen/releases/tag/v.3.0
```

- Editing items/categories
- Custom recipe search using items in categories
- Donation screen with connected Google Maps API

## Testing 3

### Test 1:
- Personal Categorization Ingredient Storage:
  -  Actions/Steps
     - Edit Category name by clicking the edit button and submitting a new name.
  - Expected Results
     - Category will automatically be renamed based on user entry.

### Test 2:
- Multi-Method Ingredient Entry:
  - Actions/Steps
    - Click on item in category 
    - Edit name, expiration date, and/or category
    - Submit the changes
  - Expected Results
    - Once clicking on an item and saving any edits the user makes, the changes should be automatically be displayed to the user.

### Test 3:
- Recipe Recommendation Based on Ingredients
  - Actions/Steps
    - Navigate to Recipes screen via navigation bar
    - Click on Recipe Search by items
    - Select which items you would like to use in a recipe and submit
    - Click Search icon (bug: names of items will not show in search bar yet)
    - Click Save on one of the recipes
    - Navigate back to main Recips screen and click Saved Recipes
    - Click Delete to remove from Saved list
  - Expected Results
    - The user will be able to search for recipes using the items in their categories. They can also save and unsave recipes.

### Test 4:
- Nearest Mapped Ingredient Donation
  - Actions/Steps
    - Navigate to Donation screen (map icon) via navigation bar
    - Allow app to access your current location
    - Use search bar to search "Food Banks" or "Food Pantry"
    - Click one that is suggested and zoom out to see pin of the location
    - Click pin and click get address to view the address of the location
  - Expected Results
    - The user should be able to see food banks based off their locations to allow them in the future to confirm a donation. 




