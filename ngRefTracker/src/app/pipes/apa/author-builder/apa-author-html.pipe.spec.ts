import { ApaAuthorPipe } from "./apa-author.pipe";

describe('ApaAuthorHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new ApaAuthorPipe();
    expect(pipe).toBeTruthy();
  });
});
