import { RecipesComponent } from './recipes.component';
import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from './../shared/ingredient';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RecipeService {

  // Event define that returns Recipe list as a result of event
  // it's kind of observable  
  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('된장찌개', '한국의 전통장국요리입니다', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTA-r1VMyH_SJLyihfMRC2Ycmh6LCsfkXvIhBpULvmhUO9_yNAJHDgr6RFTbg', [
      new Ingredient('된장', 3),
      new Ingredient('마늘', 2),
      new Ingredient('물', 10)
    ]),
    new Recipe('불고기', '정말 맛있는 요리입니다', 'http://cfile233.uf.daum.net/image/16633B4D5134154F0E1604', [
      new Ingredient('소고기', 3),
      new Ingredient('마늘', 2),
      new Ingredient('간장', 1)
    ]),
  ];

  constructor(private http: Http) { }

  getRecipes(){
    return this.recipes;
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
  }
  
  editRecipe(oldRecipe: Recipe, newRecipe: Recipe){
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  deleteRecipe(recipe: Recipe){
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  storeData(){
    // store all recipes at once 
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    // return observable
    return this.http.put('https://recipe-book-e097d.firebaseio.com/RecipesComponent.json', body, {headers: headers});
  }


  fetchData(){
    return this.http.get('https://recipe-book-e097d.firebaseio.com/RecipesComponent.json').map((response: Response) => response.json())
    .subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
        this.recipesChanged.emit(this.recipes);
      }
    );
  }

}
