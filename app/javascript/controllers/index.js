// Import and register all your controllers from the importmap via controllers/**/*_controller
//import { application } from "controllers/application"
//import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
import { application } from "./application"
//import ModalController from "./modal_controller"
import ModalController from "controllers/modal_controller"
//eagerLoadControllersFrom("controllers", application)
import ShoppingListController from "./shopping_list_controller"

application.register("modal", ModalController)
application.register("shopping-list", ShoppingListController)

console.log("✅ Controllers registered")
console.log("Application controllers:", application.controllers.map(c => c.context.identifier))

