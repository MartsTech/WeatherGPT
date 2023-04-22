import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@env/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const clone = req.clone({ url: `${environment.apiUrl}/${req.url}/` });
  return next(clone);
};
