export default class Task{
  constructor(name,desc){
    // we'll generate a new A-Z0-9 string based on the current timestamp
    this.taskID    = Date.now().toString(36)
    this.taskName  = name || 'Default Name'
    this.taskDesc  = desc || 'Default Description'
    this.completed = false
    this.deleted   = false
    this.formOpen  = false
  }
}
