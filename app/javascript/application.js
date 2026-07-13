import "@hotwired/turbo-rails"
import "controllers"

console.log("✅ Application loaded")

// Global click handler using StimulusApp
document.addEventListener('click', function(e) {
  const btn = e.target.closest('[data-action="click->modal#open"]');
  if (btn) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("Click detected on View More button");
    const mealId = btn.dataset.mealId;
    
    // Find the modal controller from StimulusApp
    const modalElement = document.getElementById('mealModal');
    const controller = window.StimulusApp?.controllers.find(c => c.context.element === modalElement);
    
    if (controller && controller.open) {
      console.log("Found controller, calling open for meal:", mealId);
      controller.open({
        preventDefault: () => {},
        currentTarget: btn
      });
    } else {
      console.error("Controller not found");
      // Fallback: direct modal show
      const modalBody = modalElement.querySelector('.modal-body');
      const modalTitle = modalElement.querySelector('.modal-title');
      modalTitle.textContent = 'Loading...';
      modalBody.innerHTML = '<div class="text-center py-5"><div class="spinner-border"></div><p>Loading...</p></div>';
      fetch(`/meals/${mealId}`)
        .then(response => response.text())
        .then(html => {
          modalBody.innerHTML = html;
          modalTitle.textContent = 'Meal Details';
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        });
    }
  }
});