import { TitleValidatorPipe } from './title-validator.pipe';

describe('TitleValidatorPipe', () => {
  it('create an instance', () => {
    const pipe = new TitleValidatorPipe();
    expect(pipe).toBeTruthy();
  });
});
