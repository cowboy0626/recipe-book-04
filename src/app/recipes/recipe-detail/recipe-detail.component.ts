import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Recipe } from '../recipe';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: []
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  recipeId: number;
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    // 서비스를 이용하므로 데이터가 안 올 수 있기때문에 데이터가 온 후에 처리되도록 함 
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.recipeId = params['id'];
        this.recipe = this.recipeService.getRecipe(this.recipeId);
      }
    );
  }

  onEdit(){
    // 링크 구성 방법에 따름 
    this.router.navigate(['/recipes', this.recipeId, 'edit']);
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.recipe);
    this.router.navigate(['/recipes']);
  }

}
