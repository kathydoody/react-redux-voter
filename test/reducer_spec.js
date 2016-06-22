import {expect} from 'chai';
import {Map, fromJS} from 'immutable';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Top Gun']};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Top Gun']
        }));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['Top Gun', 'Star Wars']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Top Gun', 'Star Wars']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Top Gun', 'Star Wars']
            },
            entries: []
        });
        const action = {type: 'VOTE', entry: 'Top Gun'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Top Gun', 'Star Wars'],
                tally: {'Top Gun': 1}
            },
            entries: []
        }));
    });

    it('has an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['Star Wars']};
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Star Wars']
        }));
    });

    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['Star Wars', 'Finding Nemo']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Finding Nemo'},
            {type: 'VOTE', entry: 'Star Wars'},
            {type: 'VOTE', entry: 'Finding Nemo'},
            {type: 'NEXT'}
        ];

        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: 'Finding Nemo'
        }));

    });

});
