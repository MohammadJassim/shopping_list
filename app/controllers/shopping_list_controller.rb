class ShoppingListController < ApplicationController
    def index
      @items = ShoppingListItem.all
    end
    
    def add
      @item = ShoppingListItem.create(
        ingredient: params[:ingredient],
        measure: params[:measure],
        recipe_name: params[:recipe_name]
      )
      
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_back fallback_location: shopping_list_index_path }
      end
    end
    
    def remove
      @item = ShoppingListItem.find(params[:id])
      @item.destroy
      
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_back fallback_location: shopping_list_index_path }
      end
    end
    
    def clear
      ShoppingListItem.destroy_all
      
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_back fallback_location: shopping_list_index_path }
      end
    end
  end