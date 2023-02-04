const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'Your notes';

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse('Your notes'));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();

  const selectedNote = notes.find((note) => note.title === title);

  if (selectedNote) {
    console.log(chalk.green.inverse(selectedNote.title));
    console.log(selectedNote.body);
  } else {
    console.log(chalk.red.inverse('Note not found'));
  }
};

const addNote = (title, body) => {
  //load notes and add into notes array
  const notes = loadNotes();
  // const duplicateNotes = notes.filter(
  //   (note) => note.title === title
  //   // if return true, filter will keep individual note in duplicate, else not keeping in array
  // );
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    // push new note into notes array
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse('Note added'));
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  // Alternative
  // const selectedNote = notes.filter(function (note) {
  //   return note.title === title;
  // });

  // if (selectedNote.length != 0) {
  //   notes.pop(selectedNote);
  // }

  const notesToKeep = notes.filter(
    (note) => note.title !== title //return notes that are not selected to keep
  );

  // if length is same, no notes removed, else diff, indeed removed
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note removed!'));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse('No note found!'));
  }
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);

  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  // load notes from notes.json, as databuffer to JSON then as object
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
