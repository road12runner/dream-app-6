import { Component, EventEmitter, Output } from "../../../node_modules/@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output()
    featureSelected = new EventEmitter<string>();

    onSelect(item: string) {
        this.featureSelected.emit(item);
    }
}