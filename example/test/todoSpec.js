// Create mounting point in DOM
document.body.innerHTML = '<todo></todo>';

// Define required tag module
var todo = riot.mount('todo', {items: []})[0];

// Test to your heart's content!
describe('todo', function() {

    it('should have an add function defined', function () {
        expect(todo.add).toBeDefined();
    });

    it('add function should add a todo item to this.items', function () {
        var initCount = todo.items.length;

        todo.text = "Add a new Todo item";

        todo.add();

        todo.update();

        expect(todo.items.length).toEqual(initCount + 1);
    })
});