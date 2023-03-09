import { render } from '@testing-library/react-native';
import RouteMap from './map';
import mockLegs from '../../fixtures/mockJourneyLegs';

describe('RouteMap', () => {
  it('renders a MapView component', () => {
    const { queryByTestId } = render(<RouteMap legs={mockLegs} />);
    const mapView = queryByTestId('map-view');
    expect(mapView).not.toBeNull();
  });

  it('renders Markers for each leg', () => {
    const { getAllByTestId } = render(<RouteMap legs={mockLegs} />);
    const markers = getAllByTestId('marker');
    expect(markers).toHaveLength(mockLegs.length);
  });

  it('renders Polylines for each leg', () => {
    const { getAllByTestId } = render(<RouteMap legs={mockLegs} />);
    const polylines = getAllByTestId('polyline');
    expect(polylines).toHaveLength(mockLegs.length);
  });

  it('renders the start marker with the correct properties', () => {
    const { getByTestId } = render(<RouteMap legs={mockLegs} />);
    const startMarker = getByTestId('start-marker');

    expect(startMarker.props.coordinate).toEqual({
      latitude: mockLegs[0].departurePoint.lat,
      longitude: mockLegs[0].departurePoint.lon,
    });
    expect(startMarker.props.title).toEqual(
      `Start at ${mockLegs[0].departurePoint.commonName}`
    );
    expect(startMarker.props.pinColor).toEqual('#009688');
  });

  it('replaces "Walk" with "Travel" in the instruction summary', () => {
    const { getAllByTestId } = render(<RouteMap legs={mockLegs} />);
    const markers = getAllByTestId('marker');

    markers.forEach((marker) => {
      const title = marker.props.title;
      expect(title).not.toMatch(/Walk/);
    });
  });
});
