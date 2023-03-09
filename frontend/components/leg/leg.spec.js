import { fireEvent, render, waitFor } from '@testing-library/react-native';
import Leg from './leg';

describe('leg component', () => {
  let summaryProp;
  let stepProp;
  let renderedComponent;

  beforeEach(() => {
    summaryProp = 'fake turn right';
    stepProp = [
      { descriptionHeading: 'Turn right' },
      { descriptionHeading: 'Turn left' },
    ];
    renderedComponent = render(<Leg summary={summaryProp} steps={stepProp} />);
  });

  it('should render a leg', () => {
    expect(renderedComponent.getByText('fake turn right')).not.toBeNull;
  });

  it('should render a leg with a summary prop', () => {
    expect(renderedComponent.getByText('fake turn right')).not.toBeNull;
  });

  it('should render a leg with no steps shown until button pressed', () => {
    expect(() => {
      renderedComponent.getByText('Turn right');
    }).toThrow(new Error('Unable to find an element with text: Turn right'));
  });

  it('should render a button', () => {
    const showStepsButton = renderedComponent.getByTestId('showSteps');
    expect(showStepsButton).not.toBeNull();
  });
  it('should render the steps when button is clicked', () => {
    const showStepsButton = renderedComponent.getByTestId('showSteps');
    fireEvent.press(showStepsButton);
    expect(renderedComponent.getAllByTestId('Step').length).toBe(2);
  });

  it('when button clicked shows the event, when clicked again it hides it', () => {
    const showStepsButton = renderedComponent.getByTestId('showSteps');
    fireEvent.press(showStepsButton);
    expect(renderedComponent.getAllByTestId('Step').length).toBe(2);
    fireEvent.press(showStepsButton);
    expect(() => {
      renderedComponent.getByText('Step');
    }).toThrow(new Error('Unable to find an element with text: Step'));
  });

  it('replaces Walk with Travel', () => {
    walkSummaryProp = 'Walk forwards';

    renderedComponent = render(
      <Leg summary={walkSummaryProp} steps={stepProp} />
    );
    expect(() => {
      renderedComponent.getByText('Walk forwards');
    }).toThrow(new Error('Unable to find an element with text: Walk forwards'));
    expect(renderedComponent.getByText('Travel forwards')).not.toBe(null);
  });
});
