describe('landing pages', () => {
  context('no cookie', () => {
    context('no localStorage', () => {
      beforeEach(() => {
        fixture.base = 'build';
        fixture.load('index.html');
        init();
      });

      before(() => {
        sinon.stub(request, 'get', (url) => {
          return Promise.resolve({ status: 401 });
        });

        sinon.stub(localStorage, 'getItem', (item) => {
          return null;
        });
      });

      it('should display the login button', (done) => {
        setTimeout(() => {
          expect(document.querySelector('#app').innerHTML)
            .to.eql('Login To Github');
          done();
        }, 100);
      });
    });
  });
});
