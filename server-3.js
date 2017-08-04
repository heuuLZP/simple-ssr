const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./mustache.template.html', 'utf-8')
});

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: '<div>访问的url是{{url}}</div>'
  });
  const context = {
  title: 'hello',
  meta: `
    <meta charset='utf-8'>
  `
}
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.setHeader('Content-Type','text/html;charset=UTF-8'); // 避免乱码
    res.end(html)
  });
})

server.listen(8080);
