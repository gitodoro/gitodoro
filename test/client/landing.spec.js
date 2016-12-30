describe('landing pages', () => {
  context('no cookie', () => {
    context('no localStorage', () => {
      beforeEach(() => {
        fixture.base = '../../bundle';
        fixture.load('index.html');
      });

      before(() => {
        sinon.stub(request, 'get', (url, payload) => {
          return Promise.resolve({ status: 401 });
        });

        sinon.stub(localStorage, 'getItem', (item) => {
          return null;
        });
      });

      it('should display the login button', () => {
        expect(document.querySelector('#app > form > button').innerHTML)
          .to.eql('Login To Github');
      });
    });
  });
});
