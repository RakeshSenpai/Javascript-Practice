const addBtn = document.querySelector('.add-btn')

let todoList = [
    {
        name: 'Washing Dishes'
    },

    {
        name : 'Watching Yotube'
    }
]

renderTodo()

function renderTodo(){
    const container = document.querySelector('.container')
    const div = document.createElement('div')
    div.className = 'todo-items'
    container.appendChild(div)
    todoList.forEach((items) => {
        const name = items.name
        div.textContent = name        
        container.appendChild(div)
    })
}

addBtn.addEventListener('click', ()=> {
    addTodo()
})

function addTodo(){
const inputElm = document.querySelector('.js-input')
const input = input.value
todoList.push({
    name:name
})
}