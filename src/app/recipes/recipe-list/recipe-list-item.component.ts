import { Recipe } from './../recipe';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rb-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styles: []
})
export class RecipeListItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() recipeId: number;
  
  constructor() { }

  ngOnInit() {
  }

}
