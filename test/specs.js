describe('karma-riot specs', function() {

  it('mounts hello tag', function() {
    var html = document.createElement('hello')
    document.body.appendChild(html)
    riot.mount('hello')
    expect(document.querySelector('hello > h1').textContent)
      .to.be('Hello!')
  })

})
