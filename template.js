export const template = document.createElement("template");

template.innerHTML = `
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
    crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
    integrity="sha384-v8BU367qNbs/aIZIxuivaU55N5GPF89WBerHoGA4QTcbUjYiLQtKdrfXnqAcXyTv"
    crossorigin="anonymous">  
  <style>
    :host {margin: 2px 0 2px 0;}

    :host([completed]) label {
      text-decoration: line-through;
      color: grey;
    }

    .input-container {
      border: 1px solid black;
      background-color: lemonchiffon;
      margin: 0 20px 0 20px;
      height: 30px;
    }

    input[type=checkbox].css-checkbox {
      position:absolute;
      z-index:-1000;
      left:-1000px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      height:1px;
      width:1px;
      margin:-1px;
      padding:0;
      border:0;
    }

    input[type=checkbox].css-checkbox + label.css-label {
      padding-top: 1px;
      padding-left:30px;
      height:24px; 
      display:inline-block;
      background-repeat:no-repeat;
      background-position: 0 0;
      font-size:16px;
      vertical-align:middle;
      cursor:pointer;
    }

    input[type=checkbox].css-checkbox:checked + label.css-label {
      background-position: 0 -24px;
    }

    label.css-label {
      background-image:url(http://csscheckbox.com/checkboxes/u/csscheckbox_4f6bc9a7cc47504b9c36e04aa489f19e.png);
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .btn-sm {
      height: 24px;
      width; 24px;
      padding: 0 4px;
      margin-top: 1px;
    }

    .col-sm-10 {
      padding: 2px;
    }

    #task-text {
      position: absolute;
      height: 28px;
      width: 90%;
      top: -0.5px;
      left: 30px;
    }

    .btn {
      display: none;
    }

    .input-container:hover .btn {
      display: inline-block;
    }

  </style>
  <div class="container input-container">
  <div class="row">
    <div class="col-sm-10">
      <input type="checkbox" id="task-checkbox" class="css-checkbox"> 
      <label for="task-checkbox" class="css-label">
        <span id="slot-text"><slot></slot></span>
      </label>
      <input id="task-text" hidden>
    </div>
    <div class="col-sm-1 button-container">
      <button type="button" class="btn btn-secondary btn-sm" id="edit-button"><i class="fas fa-pen"></i></button>
    </div>
    <div class="col-sm-1 button-container">
      <button type="button" class="btn btn-secondary btn-sm" id="delete-button"><i class="fas fa-trash-alt"></i></button>
    </div>
  </div>
</div>
`
