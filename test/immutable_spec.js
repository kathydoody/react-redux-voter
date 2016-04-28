import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

    describe('a number', () => {
        function increment(curState){
            return curState + 1;
        }

        it('is immutable', () => {
            let state = 67;
            let nextState = increment(state);

            expect(nextState).to.equal(68);
            expect(state).to.equal(67);
        });
    });

    describe('a list', () => {
        function addMovie(curState, movie){
            return curState.push(movie);
        }

        it('is immutable', () => {
            let state = List.of('The Sound of Music', 'Star Wars');
            let nextState = addMovie(state, 'Ghost');

            expect(nextState).to.equal(List.of(
                'The Sound of Music', 'Star Wars', 'Ghost'
            ));
            expect(state).to.equal(List.of(
                'The Sound of Music', 'Star Wars'
            ));
        });
    });

    describe('a tree', () => {
        function addMovie(curState, movie) {

            return curState.update('movies', movies => movies.push(movie));
            /*return curState.set(
                'movies',
                curState.get('movies').push(movie)
            );*/
        }

        it('is immutable', () => {
            let state = Map({
                movies: List.of('Trainspotting', '28 Days Later')
            });

            let nextState = addMovie(state, 'Sunshine');

            expect(nextState).to.equal(Map({
                movies: List.of(
                    'Trainspotting',
                    '28 Days Later',
                    'Sunshine'
                )
            }));
            expect(state).to.equal(Map({
                movies: List.of(
                    'Trainspotting',
                    '28 Days Later'
                )
            }));
        });
    });

});


