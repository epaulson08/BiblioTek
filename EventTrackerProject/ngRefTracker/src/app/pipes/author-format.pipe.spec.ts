import { AuthorFormatPipe } from './author-format.pipe';

describe('AuthorFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new AuthorFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
