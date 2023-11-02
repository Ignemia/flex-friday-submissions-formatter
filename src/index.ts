import "./styles/styles.scss"
import $ from "jquery";
import {StateManager} from "./components/statemanager"


function main() {
    (window as any)["stm"] = StateManager.Get();
    console.log("Running")
}

$(document).on("readystatechange", main)