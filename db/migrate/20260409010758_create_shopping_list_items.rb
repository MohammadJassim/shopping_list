class CreateShoppingListItems < ActiveRecord::Migration[7.2]
  def change
    create_table :shopping_list_items do |t|
      t.integer :user_id
      t.string :ingredient
      t.string :measure
      t.string :recipe_name

      t.timestamps
    end
  end
end
