import { application } from "./application"
import ModalController from "./modal_controller"

application.register("modal", ModalController)
console.log("Controllers registered")