import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

    describe('setEntries', () => {

        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('The Sound of Music', 'Star Wars');
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('The Sound of Music', 'Star Wars')
            }));
        });

        it('converts input to immutable', () => {
            const state = Map();
            const entries = ['The Sound of Music', 'Star Wars'];
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('The Sound of Music', 'Star Wars')
            }));
        });

    });

    describe('next', () => {

        it('takes the next two entries under vote', () => {
            const state = Map({
                entries:  List.of('The Sound of Music', 'Star Wars', 'Goonies')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('The Sound of Music', 'Star Wars')
                }),
                entries: List.of('Goonies')
            }));
        });

        it('puts the winner of current vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('The Sound of Music', 'Star Wars'),
                    tally: Map({
                        'The Sound of Music': 1,
                        'Star Wars': 3
                    })
                }),
                entries: List.of('Top Gun', 'Flashdance', 'Goonies')
            });

            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Top Gun', 'Flashdance')
                }),
                entries: List.of('Goonies', 'Star Wars')
            }));
        });

        it('puts both from tied vote back to entries',() => {
            const state = Map({
                vote: Map({
                    pair: List.of('The Sound of Music', 'Star Wars'),
                    tally: Map({
                        'The Sound of Music': 3,
                        'Star Wars': 3
                    })
                }),
                entries: List.of('Top Gun', 'Flashdance', 'Goonies')
            });

            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Top Gun', 'Flashdance')
                }),
                entries: List.of('Goonies', 'The Sound of Music', 'Star Wars')
            }));

        });


        it('marks winner when just one entry remains', () =>{
            const state = Map({
                vote: Map({
                    pair: List.of('The Sound of Music', 'Star Wars'),
                    tally: Map({
                        'The Sound of Music': 3,
                        'Star Wars': 1
                    })
                }),
                entries: List()
            });

            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'The Sound of Music'
            }));

        });

    }); // end of next

    describe('vote', () => {

        it('creates a tally for the voted entry', () => {
            const state = Map({
                    pair: List.of('The Sound of Music', 'Star Wars')
            });
            const nextState = vote(state ,'The Sound of Music');
            expect(nextState).to.equal( Map({
                    pair: List.of('The Sound of Music', 'Star Wars'),
                    tally: Map({
                        'The Sound of Music': 1
                    })
            }));
        });

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                    pair: List.of('The Sound of Music', 'Star Wars'),
                    tally: Map({
                        'The Sound of Music': 1,
                        'Star Wars': 3
                    })
            });

            const nextState = vote(state, 'The Sound of Music');
            expect(nextState).to.equal(Map({
                    pair: List.of('The Sound of Music', 'Star Wars'),
                    tally: Map({
                        'The Sound of Music': 2,
                        'Star Wars': 3
                    })
            }));

        });

    }); // end of vote


});
