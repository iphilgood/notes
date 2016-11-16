class Note {
  constructor(title, description, priority, finishedBy) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.finishedBy = finishedBy;
    this.finished = false;
    this.createDate = new Date();
  }
}

module.exports = Note;
