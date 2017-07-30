var Select = class Select {

  static _id(id){
    return document.getElementById(id)
  }

  static _class(className){
    return Select._element(`.${className}`)
  }

  static _element(name){
    return document.querySelector(name)
  }
}
