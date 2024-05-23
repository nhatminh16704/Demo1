const express = require('express');
require('dotenv').config(); //import lib and load env var
var path = require('path');
const app = express();
const port = process.env.PORT;
const route = require('./routes/clients/index.route');
const routeAdmin = require('./routes/admin/index.route');
const connectdb = require('./config/db');
const systemConfig = require('./config/system');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var methodOverride = require('method-override');


app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

connectdb();

app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
 
app.locals.prefixAdmin = systemConfig.prefixAdmin; //Global var for all pug files 
// Sử dụng middleware express.static để phục vụ các tệp tĩnh từ thư mục public
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride('_method'))
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

// Middleware để phân tích dữ liệu JSON
app.use(express.json());

// Middleware để phân tích dữ liệu URL-encoded
app.use(express.urlencoded({ extended: true }));


route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)


}); 