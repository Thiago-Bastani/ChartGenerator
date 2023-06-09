class chartFactory {
  constructor(
    data = ARRAY_OF_NUMBERS,
    label = STRING,
    labels = ARRAY,
    type = STRING,
    canvasId = STRING
  ) {
    // properties
    this._labels = ARRAY;
    this._datasets = ARRAY;
    this._options = OBJECT;
    this._chart = OBJECT;
    this._ctx = CANVAS_CONTEXT;
    this._type = STRING;

    let argumentsAreValid = false;

    try {
      argumentsAreValid = this.validate(data, label, labels, type);
    } catch (error) {
      console.error(error);
      argumentsAreValid = false;
    }

    if (!argumentsAreValid) {
      return;
    }

    this.setType(type);
    this.setCtx(canvasId);
    this.setLabels(labels);
    this.setDatasets(label, data, 1);
    this.setOptions(BEGIN_AT_ZERO);
  }

  setCtx(canvasId) {
    this._ctx = document.getElementById(canvasId);
  }

  setType(type) {
    this._type = type;
  }

  setLabels(labels) {
    this._labels = labels;
  }

  setDatasets(label, data, borderWidth) {
    this._datasets = [
      {
        label: label,
        data: data,
        borderWidth: borderWidth,
      },
    ];
  }

  setOptions(beginAtZero) {
    this._options = {
      scales: {
        y: {
          beginAtZero: beginAtZero,
        },
      },
    };
  }

  createChart() {
    this._chart = new Chart(this._ctx, {
      type: this._type,
      data: {
        labels: this._labels,
        datasets: this._datasets,
      },
      options: this._options,
    });
  }

  validate(data, label, labels, type) {
    // check if the values are null
    if (data === null) throw "Data cannot be null";
    if (label === null) throw "Label cannot be null";
    if (labels === null) throw "Labels cannot be null";
    if (type === null) throw "Type cannot be null";
    // check types
    if (typeof data !== "object") throw "Data has to be an array";
    if (typeof label !== "string") throw "Label has to be a string";
    if (typeof labels !== "object") throw "labels has to be an array";
    if (typeof type !== "string") throw "type has to be a string";
    // check if the values are empty
    if (data.length === 0) throw "Data cannot be an empty array";
    if (!label) throw "Label cannot be empty";
    if (labels.length === 0) throw "Labels cannot be an empty array";
    if (!type) throw "Type cannot be empty";
    // check array of numbers
    data.forEach((number) => {
      if (typeof number !== "number")
        throw "Data has to be an array of numbers";
    });
    // check if the shapes match
    if (data.length !== labels.length)
      throw "The data and the labels need to have the same size";

    return true;
  }
}
