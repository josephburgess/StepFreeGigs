import Step from './step.js';
import { render } from '@testing-library/react-native';

describe('step component', () => {
  it('should render a step', () => {
    stepProp = {
      descriptionHeading: 'Turn right',
      description: 'along this road',
    };
    renderedComponent = render(<Step step={stepProp} />);
    expect(renderedComponent.getByTestId('Step')).not.toBeNull;
    expect(renderedComponent.getByText('Turn right')).not.toBeNull;
    expect(renderedComponent.getByText('along this road')).not.toBeNull;
  });
  it('replaces Walk with Travel', () => {
    stepPropWithWalk = {
      descriptionHeading: 'Turn right',
      description: 'Walk forwards',
    };
    renderedComponent = render(<Step step={stepPropWithWalk} />);
    expect(() => {
      renderedComponent.getByText('Walk forwards');
    }).toThrow(new Error('Unable to find an element with text: Walk forwards'));
    expect(renderedComponent.getByText('Travel forwards')).not.toBe(null);
  });
});
