import { RecipeBook04Page } from './app.po';

describe('recipe-book-04 App', function() {
  let page: RecipeBook04Page;

  beforeEach(() => {
    page = new RecipeBook04Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('rb works!');
  });
});
