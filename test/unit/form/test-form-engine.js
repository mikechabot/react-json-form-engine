'use strict';

import { expect } from 'chai';

// Under test
import FormEngine from '../../../src/form/form-engine';

// Test objects
const falsyValues = [ false, null, undefined, 0, NaN, '', '' ];
import mockData from '../../data/mock-data';

function __newForm (definition) {
    return new FormEngine(definition);
}

describe('FormEngine', () => {
    let definitionDummy;
    beforeEach(() => {
        definitionDummy = mockData.getMinimallyViableDefinition();
    });
    describe('constructor', () => {
        describe('Invalid Parameters', () => {
            it('Should return an invalid form if the definition is falsy', () => {
                falsyValues.forEach(falsy => {
                    expect(__newForm(falsy).isValid()).to.equal(false);
                });
            });
            it('Should return an error if the the definition is falsy', () => {
                falsyValues.forEach(falsy => {
                    expect(__newForm(falsy).getError()).to.be.ok;
                });
            });
            it('Should throw an error if the definition is malformed (extra property)', () => {
                definitionDummy.foo = 'no extra props allowed!';
                expect(__newForm(definitionDummy).isValid()).equal(false);
            });
            it('Should throw an error if the definition is malformed (missing required)', () => {
                delete definitionDummy.id;
                expect(__newForm(definitionDummy).isValid()).equal(false);
            });
        });
        describe('Valid Parameters', () => {
            it('Should not throw an error with a properly formed definition (minimally viable)', () => {
                expect(() => { __newForm(definitionDummy); }).to.not.throw(Error);
            });
            it('Should not throw an error with a properly formed definition (with fields)', () => {
                definitionDummy = mockData.getFormDefinitionWithFields();
                __newForm(definitionDummy);
            });
        });
    });
});
