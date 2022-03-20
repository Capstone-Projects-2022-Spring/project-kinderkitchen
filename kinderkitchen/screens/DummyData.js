//My need to conver to default Prop Values
//https://stackoverflow.com/questions/44419650/react-js-set-a-default-value-into-a-prop

/*This will get from database once synched, for now dummy data*/
const defaultCategories = [
  {
    category_id: 1,
    category_name: "Fridge",
  },
  {
    category_id: 2,
    category_name: "Pantry",
  },
];

/*For date formating later import date-fns (npm install date-fns --save)
&(import {format} from "date-fns"
so react and database can format dates correctlt to display 
expiring food items"
 
use this function when calling obj.expiration_date in functiionality*/
const dummyThiccIngredients = [
  {
    item_id: 1,
    item_name: "Milk",
    expiration_date: "2022-03-06",
    category_id: 1,
    account_id: 1,
  },
  {
    item_id: 2,
    item_name: "Lucky Charms",
    expiration_date: "2022-03-17",
    category_id: 2,
    account_id: 1,
  },
  {
    item_id: 3,
    item_name: "Eggs",
    expiration_date: "2022-04-20",
    category_id: 1,
    account_id: 1,
  },
  {
    item_id: 4,
    item_name: "Goldfish",
    expiration_date: "2022-03-28",
    category_id: 2,
    account_id: 1,
  },
];