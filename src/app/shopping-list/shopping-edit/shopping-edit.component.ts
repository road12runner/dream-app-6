import { Subscription } from 'rxjs/Subscription';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.module';
import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm: NgForm;

  private subscription: Subscription;
  private editMode = false;
  private editedItemIndex: number;
  private editItem: Ingredient;
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;

  //@Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe( (id: number) => {
      this.editMode = true;
      this.editedItemIndex  = id;
      this.editItem = this.shoppingListService.getIngredient(id);
      this.shoppingListForm.setValue({name: this.editItem.name, amount: this.editItem.amount});
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    console.log('form', form);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
     
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();

    //const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    //this.ingredientAdded.emit(newIngredient);
    
  }
  
  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }


  onDelete() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.onClear();
    }
    
  }

}
