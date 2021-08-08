$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

//Bot Block
Blockly.Blocks['bot_messenger'] = {
  init: function () {
    this.appendStatementInput("Bot")
      .setCheck(null)
      .appendField("Bot");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//Question Block
Blockly.Blocks['question_asked'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Ask me a Question :")
      .appendField(new Blockly.FieldDropdown([["What is the date today?", "date"], ["What is the time now?", "time"], ["How are you?", "status"], ["What is JavaScript?", "lang"], ["What is your name?", "name"]]), "question");
    this.setPreviousStatement(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['question_asked'] = function (block) {
  var dropdown_question = block.getFieldValue('question');
  var questions;
  switch (dropdown_question) {
    case "date":
      var today = new Date();
      questions = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
      break;
    case "time":
      var today = new Date();
      questions = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + " IST";
      break;
    case "status":
      questions = "I am good, I hope you are doing great aswell!";
      break;
    case "lang":
      questions = "JavaScript, is a programming language used mostly in Web Development and is a very powerful tool. ";
      break;
    case "name":
      questions = "I am your personal assistBot, you can call me Avi.";
      break;
  }
  // takes in the dropdown value and sends the correspoding answer to the UI display
  var code = `
  var inputTextValue = "${questions}";
  `;

  return code;
};

Blockly.JavaScript['bot_messenger'] = function (block) {
  // To receive the values from the nested Block which is the question asked Block
  return Blockly.JavaScript.statementToCode(block, 'Bot');

};

var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

function redrawUi() {

  if (typeof inputTextValue !== "undefined") {
    $("#inputBox").text(inputTextValue);

  } else {
    $("#inputBox").text("");
  }
}

function runcode() {
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  delete inputTextValue;
  // Added to clear the workspace when user clicks on reset button
  Blockly.mainWorkspace.clear();
  redrawUi();
}


