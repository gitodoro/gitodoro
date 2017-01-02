describe('landing pages', () => {
  context('no cookie', () => {
    context('no localStorage', () => {
      before(() => {
        sinon.stub(request, 'get', (url) => Promise.resolve({ status: 401 }));
        sinon.stub(localStorage, 'getItem', (item) => null);
      });
      beforeEach(() => {
        fixture.base = 'build';
        fixture.load('index.html');

        init();
      });

      afterEach(() => fixture.cleanup());

      it('should display the login button', (done) => {
        setTimeout(() => {
          expect(document.querySelector('#app > form > button').innerHTML)
            .to.eql('Login To Github');
          done();
        }, 10);
      });
    });
  });
});
