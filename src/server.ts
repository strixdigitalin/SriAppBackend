import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import MeridianLogyRoute from '@routes/meridianlogy.route';
import ReflexologyRoute from '@routes/reflexology.route';
import SubscriptionRoute from '@routes/subscription.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new MeridianLogyRoute(), new ReflexologyRoute(), new SubscriptionRoute()]);

app.listen();
