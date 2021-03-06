import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Property from './property';
import {OFFERS, USER_EMAIL, doNothing} from '../../tests-mocks';
import {ActionType} from '../../reducer/data/data';
import {createAPI} from '../../api';

const api = createAPI();
const mockStore = configureStore([thunk.withExtraArgument(api)]);

const initialState = {
  DATA: {
    reviews: [],
    nearbyOffers: [],
    isError: false,
    isSending: false,
    favorites: [],
  },
};

const expectedActions = [
  {type: ActionType.GET_REVIEWS},
  {type: ActionType.GET_NEARBY_OFFERS},
  {type: ActionType.POST_REVIEW},
  {type: ActionType.LOAD_FAVORITES},
];

const store = mockStore(initialState, expectedActions);

it(`Should render Property correctly`, () => {
  window.scrollTo = jest.fn();
  const tree = renderer
    .create(
        <MemoryRouter>
          <Provider store={store}>
            <Property
              userEmail={USER_EMAIL}
              offer={OFFERS[0].offers[0]}
              location={OFFERS[0].location}
              offers={OFFERS[0].offers}
              activeCardCoordinates={[]}
              onRentalCardHover={doNothing}
              onBookmarkClick={doNothing}
              onUserEmailClick={doNothing}
            />
          </Provider>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
