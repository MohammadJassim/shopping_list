# Pin packages from working CDNs
pin "application", to: "/application.js"
pin "@hotwired/turbo-rails", to: "https://cdn.jsdelivr.net/npm/@hotwired/turbo@7.3.0/dist/turbo.js"
pin "@hotwired/stimulus", to: "https://cdn.jsdelivr.net/npm/@hotwired/stimulus@3.2.2/dist/stimulus.umd.js"
pin "@hotwired/stimulus-loading", to: "https://cdn.jsdelivr.net/npm/@hotwired/stimulus-loading@2.0.0/dist/stimulus-loading.js"

pin_all_from "app/javascript/controllers", under: "controllers"