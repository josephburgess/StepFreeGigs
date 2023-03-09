import { render, fireEvent } from '@testing-library/react-native';
import Event from './event';

describe('Event component testing', () => {
  test('it displays the name of the event', () => {
    const { getByText } = render(
      <Event eventData={{ eventName: 'Dirty DnB Fridays!' }} />
    );
    const textElement = getByText('Dirty DnB Fridays!');
    expect(textElement).toBeDefined();
  });

  test('it displays the Price Range if present', () => {
    const { getByText } = render(
      <Event eventData={{ priceRanges: '£22 - £30 ' }} />
    );
    const textElement = getByText('22 - 30');
    expect(textElement).toBeDefined();
  });

  test('it displays the venue', () => {
    const { getByText } = render(<Event eventData={{ venue: 'The Garage' }} />);
    const textElement = getByText('The Garage');
    expect(textElement).toBeDefined();
  });

  test('it displays the distance from the user', () => {
    const { getByText } = render(
      <Event eventData={{ distance: '1.32 miles' }} />
    );
    const textElement = getByText('1.32 mi');
    expect(textElement).toBeDefined();
  });

  // test('it displays the Date', () => {
  //   const { getByText } = render(
  //     <Event eventData={{ date: '2023-03-01T19:00:00Z' }} />
  //   );
  //   const textElement = getByText('2023-03-01T19:00:00Z');
  //   expect(textElement).toBeDefined();
  // });

  test('Buy tickets button is not rendered unless event pressed', () => {
    const { getByTestId } = render(<Event eventData={{}} />);
    const collapsible = getByTestId('collapsible');
    expect(collapsible.props.isCollapsed).toBe(true);
  });

  test('View Route button is not rendered unless event pressed', () => {
    const { getByTestId } = render(<Event eventData={{}} />);
    const collapsible = getByTestId('collapsible');
    expect(collapsible.props.isCollapsed).toBe(true);
  });

  test('Buy tickets button is rendered after event is pressed', () => {
    const { getByTestId } = render(<Event eventData={{}} />);
    fireEvent.press(getByTestId('eventButton'));
    const getTicketsButton = getByTestId('Buy Tickets button');
    expect(getTicketsButton).not.toBeNull();
  });

  test('View Route button is rendered after event is pressed', () => {
    const { getByText, getByTestId } = render(<Event eventData={{}} />);
    fireEvent.press(getByTestId('eventButton'));
    const getTicketsButton = getByText('View Route');
    expect(getTicketsButton).toBeDefined();
  });

  test('Pressing view route takes you to journey screen', () => {
    const mockNavigation = { push: jest.fn() };
    const { getByText, getByTestId } = render(
      <Event
        eventData={{ venuePostcode: 'fakePostcode' }}
        currentLocation='fakeLocation'
        navigation={mockNavigation}
      />
    );
    fireEvent.press(getByTestId('eventButton'));
    fireEvent.press(getByText('View Route'));
    expect(mockNavigation.push).toHaveBeenCalledWith('Journey', {
      currentLocation: 'fakeLocation',
      endLocation: 'fakePostcode',
    });
  });

  test('Buy tickets button is not rendered after event pressed twice', () => {
    const { getByText, getByTestId } = render(<Event eventData={{}} />);
    fireEvent.press(getByTestId('eventButton'));
    fireEvent.press(getByTestId('eventButton'));
    const collapsible = getByTestId('collapsible');
    expect(collapsible.props.isCollapsed).toBe(true);
  });

  test('View Route button is not rendered after event pressed twice', () => {
    const { getByText, getByTestId } = render(<Event eventData={{}} />);
    fireEvent.press(getByTestId('eventButton'));
    fireEvent.press(getByTestId('eventButton'));
    const collapsible = getByTestId('collapsible');
    expect(collapsible.props.isCollapsed).toBe(true);
  });
});
