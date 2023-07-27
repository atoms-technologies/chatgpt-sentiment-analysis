const reader = require('any-text');

reader.getText(`./uploads/Sample-doc-file-100kb.doc`).then( (data) => {
  console.log(data);
});