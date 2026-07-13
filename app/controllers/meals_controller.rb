# app/controllers/meals_controller.rb
class MealsController < ApplicationController
  def index
    @search_term = params[:search]
    @meals = @search_term.present? ? MealService.search_meals(@search_term) : []
  end

  def show
    @meal = MealService.get_meal_details(params[:id])
    render partial: "meal_details", locals: { meal: @meal }
  end  

  def random
    @meal = MealService.random_meal
    render partial: "meal_details", locals: { meal: @meal }
  end  

  def test_stimulus
    render layout: 'application'
  end  
end