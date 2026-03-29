import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("Modal controller connected")
    
    if (typeof bootstrap !== 'undefined') {
      this.modal = new bootstrap.Modal(this.element)
    }
  }
  
  open(event) {
    event.preventDefault()
    const mealId = event.currentTarget.dataset.mealId
    const frame = document.getElementById("modal_content")
    
    if (frame && mealId) {
      frame.setAttribute("src", `/meals/${mealId}`)
      if (this.modal) {
        this.modal.show()
      }
    }
  }
}