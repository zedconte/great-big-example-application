// app
import { RouterExtensions } from './router-extensions.service';
import { UserService } from './user.service';
import { DataService } from './data.service';
import { SocketService } from './socket.service';
import { AuthGuard } from './auth.guard';

export const CORE_PROVIDERS: any[] = [
  RouterExtensions,
  UserService,
  DataService,
  SocketService,
  AuthGuard
];

export * from './router-extensions.service';
