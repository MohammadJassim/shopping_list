import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["count"]
  
  connect() {
    console.log("Shopping list controller connected")
    this.loadShoppingList()
    this.updateCount()
    this.renderCurrentPage()
  }
  
  loadShoppingList() {
    const saved = localStorage.getItem('shoppingList')
    this.shoppingList = saved ? JSON.parse(saved) : []
    console.log(`Loaded ${this.shoppingList.length} items from localStorage`)
  }
  
  saveShoppingList() {
    localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList))
    this.updateCount()
    this.renderCurrentPage()
  }
  
  addIngredients(event) {
    console.log("Adding ingredients...")
    const ingredients = JSON.parse(event.currentTarget.dataset.ingredients)
    const recipeName = event.currentTarget.dataset.recipeName
    
    ingredients.forEach(newIngredient => {
      const normalizedName = newIngredient.ingredient.toLowerCase().trim()
      
      const existing = this.shoppingList.find(item => 
        item.ingredient.toLowerCase().trim() === normalizedName
      )
      
      if (existing) {
        // Try to aggregate measures numerically
        const aggregated = this.aggregateMeasures(existing.measure, newIngredient.measure)
        existing.measure = aggregated
        
        if (!existing.recipes.includes(recipeName)) {
          existing.recipes.push(recipeName)
        }
      } else {
        this.shoppingList.push({
          id: Date.now(),
          ingredient: newIngredient.ingredient,
          measure: newIngredient.measure,
          recipes: [recipeName]
        })
      }
    })
    
    this.saveShoppingList()
    this.showNotification(`Added ${ingredients.length} items to shopping list!`)
  }
  
  aggregateMeasures(measure1, measure2) {
    // Extract numbers from measures
    const num1 = parseFloat(measure1)
    const num2 = parseFloat(measure2)
    
    // If both are numbers, add them
    if (!isNaN(num1) && !isNaN(num2)) {
      const unit = measure1.replace(/[\d.\s]/g, '').trim()
      const total = num1 + num2
      return `${total} ${unit}`
    }
    
    // If can't aggregate mathematically, combine with comma
    return `${measure1}, ${measure2}`
  }
  
  removeItem(event) {
    const itemId = parseInt(event.currentTarget.dataset.itemId)
    this.shoppingList = this.shoppingList.filter(item => item.id !== itemId)
    this.saveShoppingList()
    this.showNotification('Item removed from shopping list')
  }
  
  clearList() {
    if (confirm('Clear your entire shopping list?')) {
      this.shoppingList = []
      this.saveShoppingList()
      this.showNotification('Shopping list cleared')
    }
  }
  
  updateCount() {
    const count = this.shoppingList?.length || 0
    console.log(`Updating count to: ${count}`)
    
    // Update all possible count elements
    const countElements = document.querySelectorAll('#shopping_list_count, [data-shopping-list-target="count"]')
    countElements.forEach(element => {
      element.textContent = count
      element.style.display = count > 0 ? 'inline-block' : 'none'
    })
  }
  
  renderCurrentPage() {
    // Check if we're on the shopping list page
    const container = document.getElementById('shoppingListContainer')
    if (container) {
      this.renderShoppingList(container)
    }
  }
  
  renderShoppingList(container) {
    console.log("Rendering shopping list, items:", this.shoppingList?.length)
    
    if (!this.shoppingList || this.shoppingList.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-cart fs-1 text-muted"></i>
          <p class="text-muted mt-3">Your shopping list is empty</p>
          <p class="small text-muted">Add ingredients from recipes to get started!</p>
        </div>
      `
      return
    }
    
    let html = '<div class="list-group">'
    this.shoppingList.forEach(item => {
      html += `
        <div class="list-group-item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <strong>${this.escapeHtml(item.ingredient)}</strong>
              <br>
              <small class="text-muted">${this.escapeHtml(item.measure)}</small>
              <br>
              <small class="text-muted">From: ${this.escapeHtml(item.recipes.join(', '))}</small>
            </div>
            <button class="btn btn-sm btn-outline-danger" 
                    data-action="click->shopping-list#removeItem"
                    data-item-id="${item.id}">
              <i class="bi bi-trash"></i> Remove
            </button>
          </div>
        </div>
      `
    })
    html += '</div>'
    
    container.innerHTML = html
  }
  
  showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.shopping-list-notification')
    if (existing) existing.remove()
    
    const notification = document.createElement('div')
    notification.className = 'alert alert-success alert-dismissible fade show position-fixed bottom-0 end-0 m-3 shopping-list-notification'
    notification.style.zIndex = '9999'
    notification.style.minWidth = '250px'
    notification.innerHTML = `
      <i class="bi bi-check-circle"></i> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `
    document.body.appendChild(notification)
    
    setTimeout(() => notification.remove(), 3000)
  }
  
  escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }
}