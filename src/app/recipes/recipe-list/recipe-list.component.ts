import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: []
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

}
