# README

* This is the README for the Shopping List program

- The program allows a user to search for meals and displays a list of meals results in a grid with: image (field:
strMealThumb), title (field: strMeal), category, area matching the search term entered by the user. 
- Only input that matches requested search input will be matched. 
- The results will be displayed on the page along with their details from themealdb API https://www.themealdb.com/api/json/v1/1/search.php.
- When the user clicks on View More on a given recipe, a modal popup displays with the list of ingredients on the page as well as the ability to add each ingredient individually or all ingredients collectively to the Shopping Cart or List. 
- The User can also delete items from the list.
- The shopping cart is accessible from anywhere on the app.
- An additional feature is the Surprise Me button which fetches a random Meal or Recipe from themealdb API https://www.themealdb.com/api/json/v1/1/random.php. This is also accessible from anywhere in the app.

* To run the program:
- 1. clone the repo locally using `git clone git@github.com:MohammadJassim/shopping_list` or using https `https://github.com/MohammadJassim/shopping_list.git`
- 2. go to the program directory `cd shopping_list`
- 3. create a .env file an add the environment variable `MEALDB_URL='https://www.themealdb.com/api/json/v2/1'` or run `export MEALDB_URL='https://www.themealdb.com/api/json/v2/1'` from the command line. 
- 4. start the rails server using `rails s -p 3000` and navigate to localhost:3000 from a web browser.

# IMPLEMENTATION DETAILS 
- The program is written in Ruby on Rails with Javascript. The meals are fetched from themealdb via the ruby code in `app/services/meal_service.rb` and the `meals_controller.rb` contains the actions `index` and `show`. The `Httparty` gem is used to fetch the data from themealdb API via Get requests. The modal popup and adding of ingredients displayed on it to the shopping cart is done via Javascript. The rails way to do this would be using gems `turbo-rails` and `stimulus`, however there was a conflict in the environment when using `sprockets` for rendering `css` styles and `images` for assets and using `turbo rails and stimulus` for rendering javascript. Switching to the recommended gem `Propshaft` for asset pipeline for `rails version 7.xx` didn't help to resolve the issue, so plain Javascript via CDN was used to complete the program.
- 3 PRs were created from separate branches to merge code in the `develop` branch. These show the breakdown of the implementation into 3 stages. The PRs can be viewed here: https://github.com/MohammadJassim/shopping_list/pulls?q=is%3Apr+is%3Aclosed. 
- The first stage was the imlementation of Ruby on Rails meals_service in the branch `meals_service`, Meals API with modal display using javascript and bootstrap, merged into `develop` branch via pull request https://github.com/MohammadJassim/shopping_list/pull/1.   
- The second stage was the imlementation of the Shopping List feature in the branch `add_to_list`, Add to Shopping List feature with saving aggregated measures to local storage, merged into `develop` branch via pull request https://github.com/MohammadJassim/shopping_list/pull/2. 
- The third stage was the imlementation of the Surprise Me feature in the branch `surprise_me`, Added the Surprise Me feature accessible from anywhere in the app, merged into `develop` branch via pull request https://github.com/MohammadJassim/shopping_list/pull/3. 


