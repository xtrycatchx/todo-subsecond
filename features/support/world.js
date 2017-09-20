const fs = require('fs')
const path = require('path')

const { setWorldConstructor } = require('cucumber')
const TodoList = require('../../lib/TodoList')
const mountBrowserApp = require('../../lib/mountBrowserApp')
const DomTodoList = require('../../test_support/DomTodoList')

class TodoWorld {
  constructor() {
    const todoList = new TodoList()

    this.contextTodoList = todoList

    if (global.document) {
      const domTodoList = createDomTodoList(todoList)
      this.actionTodoList = domTodoList
    } else {
      this.actionTodoList = todoList
    }

    this.outcomeTodoList = todoList
  }
}

function createDomTodoList(todoList) {
  const publicIndexHtmlPath = path.join(__dirname, '..', '..', 'public', 'index.html')
  const html = fs.readFileSync(publicIndexHtmlPath, 'utf-8')
  const domNode = document.createElement('div')
  domNode.innerHTML = html
  document.body.appendChild(domNode)
  mountBrowserApp({ domNode, todoList })
  return new DomTodoList(domNode)
}

setWorldConstructor(TodoWorld)
