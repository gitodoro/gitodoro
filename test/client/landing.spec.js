describe('landing pages', () => {
  context('no cookie', () => {
    context('no localStorage', () => {
      before(() => {
        fixture.base = 'build';
        fixture.load('index.html');
        init();

        sinon.stub(request, 'get', (url) => {
          return Promise.resolve({ status: 401 });
        });

        sinon.stub(localStorage, 'getItem', (item) => {
          return null;
        });
      });

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
