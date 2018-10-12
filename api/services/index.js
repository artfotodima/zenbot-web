import authentication from './authentication';
import custom from './custom';
import users from './users/users.service';
import messages from './messages';
import zenbotBackfill from './zenbot.backfill/zenbot.backfill.service';
import zenbotSim from './zenbot.sim/zenbot.sim.service';

export default function services(app) {
  app.configure(authentication);
  app.configure(custom);
  app.configure(users);
  app.configure(messages);
  app.configure(zenbotBackfill);
  app.configure(zenbotSim);
}
