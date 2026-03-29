import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["count", "sidebar"]
  
  connect() {
    console.log("✅ Shopping list controller connected")
    this.shoppingList = []
    this.loadFromLocalStorage()
    this.updateUI()
  }
  
  loadFromLocalStorage() {
    const saved = localStorage.getItem('shoppingList')
    if (saved) {
      this.shoppingList = JSON.parse(saved)
      console.log(`Loaded ${this.shoppingList.length} items`)
    }
  }
  
  saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList))
    this.updateUI()
  }
  
  addIngredients(event) {
    const ingredients = JSON.parse(event.currentTarget.dataset.ingredients)
    const recipeName = event.currentTarget.dataset.recipeName
    
    console.log(`Adding ${ingredients.length} ingredients from ${recipeName}`)
    
    ingredients.forEach(ingredient => {
      this.shoppingList.push({
        id: `${Date.now()}_${ingredient.ingredient.replace(/\s/g, '_')}`,
        ingredient: ingredient.ingredient,
        measure: ingredient.measure,
        recipeName: recipeName,
        addedAt: new Date().toISOString()
      })
    })
    
    this.saveToLocalStorage()
    this.showNotification(`Added ${ingredients.length} items!`)
  }
  
  removeItem(event) {
    const itemId = event.currentTarget.dataset.itemId
    this.shoppingList = this.shoppingList.filter(item => item.id !== itemId)
    this.saveToLocalStorage()
    this.showNotification('Item removed')
  }
  
  clearList() {
    if (confirm('Clear shopping list?')) {
      this.shoppingList = []
      this.saveToLocalStorage()
      this.showNotification('List cleared')
    }
  }
  
  updateUI() {
    if (this.hasCountTarget) {
      this.countTarget.textContent = this.shoppingList.length
      this.countTarget.style.display = this.shoppingList.length > 0 ? 'inline-block' : 'none'
    }
    
    if (this.hasSidebarTarget) {
      this.renderSidebar()
    }
  }
  
  renderSidebar() {
    if (this.shoppingList.length === 0) {
      this.sidebarTarget.innerHTML = `
        <div class="card mt-3">
          <div class="card-header bg-success text-white">
            <h5 class="mb-0">Shopping List</h5>
          </div>
          <div class="card-body text-center">
            <i class="bi bi-cart fs-1 text-muted"></i>
            <p class="text-muted mt-2 mb-0">Your list is empty</p>
          </div>
        </div>
      `
      return
    }
    
    const recent = this.shoppingList.slice(0, 5)
    let html = `
      <div class="card mt-3">
        <div class="card-header bg-success text-white d-flex justify-content-between">
          <h5 class="mb-0">Shopping List (${this.shoppingList.length})</h5>
          <button class="btn btn-sm btn-outline-light" data-action="click->shopping-list#clearList">
            Clear
          </button>
        </div>
        <div class="list-group list-group-flush">
    `
    
    recent.forEach(item => {
      html += `
        <div class="list-group-item d-flex justify-content-between">
          <div>
            <strong>${this.escapeHtml(item.ingredient)}</strong>
            <small class="text-muted d-block">${this.escapeHtml(item.measure)}</small>
          </div>
          <button class="btn btn-sm btn-outline-danger" 
                  data-action="click->shopping-list#removeItem"
                  data-item-id="${item.id}">
            ×
          </button>
        </div>
      `
    })
    
    if (this.shoppingList.length > 5) {
      html += `<div class="list-group-item text-center text-muted">+ ${this.shoppingList.length - 5} more</div>`
    }
    
    html += `
        </div>
        <div class="card-footer">
          <a href="/shopping_list" class="btn btn-outline-success btn-sm w-100">View Full List</a>
        </div>
      </div>
    `
    
    this.sidebarTarget.innerHTML = html
  }
  
  showNotification(message) {
    const notification = document.createElement('div')
    notification.className = 'alert alert-success alert-dismissible fade show position-fixed bottom-0 end-0 m-3'
    notification.style.zIndex = '9999'
    notification.innerHTML = `
      ${message}
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