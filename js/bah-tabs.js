Polymer({

  is: 'bah-tabs',

  properties: {
    selectedStepNumber: {
      type: Number,
      value: 1,
      notify: true,
      observer: '_sendChangeEvent'
    },
    steps: {
      type: Array
    },
    isLastStep: {
      type: Object,
      value: false,
      notify: true,
      computed: '_isLastStep(selectedStepNumber, steps)'
    },
    isFirstStep: {
      type: Object,
      value: false,
      notify: true,
      computed: '_isFirstStep(selectedStepNumber)'
    }
  },

  /**
   * Returns the appropriate CSS classes to highlight the step button, when it is
   * the current step.
   */
  _updateStepButtonState: function (stepNumber, currentStep) {
    var returnValue = (stepNumber == currentStep) ? "btn active-step btn--icon" : "btn btn--icon";
    return returnValue;
  },

  /**
   * Returns the appropriate CSS classes to disable the next button, when it is
   * the last step.
   */
  _updateNextButtonState: function (currentStep, steps) {
    var returnValue = (currentStep == steps.length) ? "btn btn--disabled" : "btn btn--tertiary";
    return returnValue;
  },

  /**
   * Returns the appropriate CSS classes to disable the previous button, when it is
   * the first step.
   */
  _updatePreviousButtonState: function (currentStep) {
    var returnValue = (currentStep == 1) ? "btn btn--disabled" : "btn btn--tertiary";
    return returnValue;
  },

  /**
   * Select a step based off a button click.
   */
  _selectStep: function (e) {
    this.selectedStepNumber = e.model.__data__.item.number;
  },

  /**
   * Retreats the step one, if not the first step.
   */
  _previousStep: function () {
    if (this.selectedStepNumber > 1) {
      this.selectedStepNumber--;
    }
  },

  /**
   * Advances the step one, if not the last step.
   */
  _nextStep: function () {
    if (this.selectedStepNumber < this.steps.length) {
      this.selectedStepNumber++;
    }
  },

  /**
   * Returns true if it is not the last step, false otherwise.
   */
  _isNotLastStep: function (selectedStepNumber, steps) {
    var returnValue = selectedStepNumber < steps.length-1;
    return returnValue;
  },

  /**
   * Returns true if it is the last step, false otherwise.
   */
  _isLastStep: function (selectedStepNumber, steps) {
    return (selectedStepNumber == steps.length);
  },

  /**
   * Returns true if it is the first step, false otherwise.
   */
  _isFirstStep: function (selectedStepNumber) {
    return (selectedStepNumber == 1);
  },

  /**
   * When the step number has changed, broadcast an event to let other component's know.
   */
  _sendChangeEvent: function () {
    var eventDetails = {
      newStepNumber: this.selectedStepNumber
    };
    this.fire('bah-tabs-changed', eventDetails);
  }
});