require 'httparty'

class MealService
  include HTTParty
  base_uri ENV['MEALDB_URL']

  def self.search_meals(query)
    response = get('/search.php', query: { s: query })
    return [] unless response.success?
    
    meals = response.parsed_response['meals']
    return [] if meals.nil?
    
    meals.map { |meal| format_meal(meal) }
  end

  def self.get_meal_details(meal_id)
    response = get('/lookup.php', query: { i: meal_id })
    return nil unless response.success?
    
    meal = response.parsed_response['meals']&.first
    return nil if meal.nil?
    
    format_meal_details(meal)
  end

  private

  def self.format_meal(meal)
    {
      id: meal['idMeal'],
      name: meal['strMeal'],
      category: meal['strCategory'],
      area: meal['strArea'],
      thumbnail: meal['strMealThumb'],
      instructions: meal['strInstructions']
    }
  end

  def self.format_meal_details(meal)
    ingredients = []
    1.upto(20) do |i|
      ingredient = meal["strIngredient#{i}"]
      measure = meal["strMeasure#{i}"]
      break if ingredient.blank? || ingredient.strip.empty?
      ingredients << { ingredient: ingredient, measure: measure } if ingredient.present?
    end

    {
      id: meal['idMeal'],
      name: meal['strMeal'],
      category: meal['strCategory'],
      area: meal['strArea'],
      thumbnail: meal['strMealThumb'],
      instructions: meal['strInstructions'],
      tags: meal['strTags'],
      youtube: meal['strYoutube'],
      source: meal['strSource'],
      ingredients: ingredients
    }
  end

  def self.random_meal
    response = get('/random.php')
    return nil unless response.success?
    
    meal = response.parsed_response['meals']&.first
    return nil if meal.nil?
    
    format_meal_details(meal)
  end
    
end