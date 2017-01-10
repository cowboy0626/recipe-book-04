import { Ingredient } from './../../shared/ingredient';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: []
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  private recipeId: number;
  private recipe: Recipe;
  private isNew = true;

  recipeForm: FormGroup;
  private subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if(params.hasOwnProperty('id')){
          this.isNew = false;
          this.recipeId =  +params['id'];
          this.recipe = this.recipeService.getRecipe(this.recipeId);
        } else {
          this.isNew = true;
          this.recipe = null;
        }
        this.initForm();
      }
    );
  }

  // Building Form after data getting 
  initForm(){ 
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if(!this.isNew){
      // edit mode
      if(this.recipe.hasOwnProperty('ingredients')){
        // when it has ingredients
        for(let i=0; i<this.recipe.ingredients.length; i++){
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(this.recipe.ingredients[i].name, Validators.required), 
              amount: new FormControl(this.recipe.ingredients[i].amount, [Validators.required, Validators.pattern("\\d+")])
            })
          );

        }
      }
      recipeName = this.recipe.name;
      recipeImageUrl = this.recipe.imagePath;
      recipeContent = this.recipe.description;
    }

    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required], 
      imagePath: [recipeImageUrl, Validators.required], 
      description: [recipeContent, Validators.required], 
      ingredients: recipeIngredients
    });
  }

  onSubmit(){
    const newRecipe = this.recipeForm.value;
    if(this.isNew){
      this.recipeService.addRecipe(newRecipe);
    } else {
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }

  onCancel(){
    this.navigateBack();
  }

  private navigateBack(){
    this.router.navigate(['../']);
  }


  // add ingredient item on form 
  onAddItem(name: string, amount: number){
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
        name: new FormControl(name, Validators.required), 
        amount: new FormControl(amount, [Validators.required, Validators.pattern("\\d+")])
      })
    );
  }

  // remove ingredient item on form (not in data)
  onRemoveItem(index: number){
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
