import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("✅ Modal controller CONNECTED to:", this.element)
    console.log("Element ID:", this.element.id)
  }
  
  open(event) {
    console.log("🎯 OPEN METHOD CALLED")
    console.log("Meal ID:", event.currentTarget?.dataset?.mealId)
    event.preventDefault()
    
    const mealId = event.currentTarget.dataset.mealId
    const modalBody = this.element.querySelector('.modal-body')
    const modalTitle = this.element.querySelector('.modal-title')
    
    modalTitle.textContent = 'Loading...'
    modalBody.innerHTML = `
      <div class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading meal details...</p>
      </div>
    `
    
    fetch(`/meals/${mealId}`)
      .then(response => response.text())
      .then(html => {
        modalBody.innerHTML = html
        modalTitle.textContent = 'Meal Details'
        const modal = new bootstrap.Modal(this.element)
        modal.show()
        console.log("Modal shown")
        this.element.removeAttribute('aria-hidden')
      })
      .catch(error => {
        console.error("Fetch error:", error)
        modalBody.innerHTML = '<div class="alert alert-danger">Failed to load meal details.</div>'
      })
  }
}