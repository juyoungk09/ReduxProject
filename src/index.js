import { createStore } from "redux";

const form = document.querySelector("form"); 
const input = document.querySelector("#input");
const add = document.querySelector("#add");
const remove = document.querySelector("#remove");
const list = document.querySelector("#list");
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{text: action.text, id: Date.now()},...state];
    case REMOVE_TODO:
      return state.filter(toDo => toDo.id !== parseInt(action.id));
    default:
      return state;
  }
};
const store = createStore(reducer);

const addToDo = (text) => {
  return { type: ADD_TODO, text};
};
const removeToDo = (id) => {
  return { type: REMOVE_TODO, id};
}
const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
}
const dispatchRemoveToDo = (id) => {
  store.dispatch(removeToDo(id));
} 
const paintTodos = () => {
  const toDos = store.getState();
  list.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = "X";
    button.addEventListener("click", () => {
      dispatchRemoveToDo(toDo.id);
    });
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(button);
    list.appendChild(li);
  });
};
store.subscribe(paintTodos);
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(input.value);
  const toDo = input.value;
  dispatchAddToDo(toDo);
  input.value = "";
};
form.addEventListener("submit", handleSubmit);
