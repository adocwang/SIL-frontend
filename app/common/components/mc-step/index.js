import mcStepController from './ctrl';

const mcStep = {
  templateUrl: 'common/components/mc-step/template.html',
  controller: mcStepController,
  controllerAs: 'vm',
  bindings: {
    stepList: '=',
    currentStep: '='
  }
};

export default mcStep;
