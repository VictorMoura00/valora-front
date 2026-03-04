import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { toast } from 'ngx-sonner';
import { ProblemDetails, ValidationProblemDetails } from '../models/problem-details.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Interceptor capturou:', error);

      if (error.error && typeof error.error === 'object' && 'title' in error.error) {
        const problem = error.error as ProblemDetails;

        if ('errors' in problem) {
          const validationProblem = problem as ValidationProblemDetails;
          
          const formattedErrors = Object.entries(validationProblem.errors)
            .map(([field, messages]) => `• ${field}: ${messages.join(', ')}`)
            .join('\n');
            
          toast.warning(validationProblem.title || 'Atenção aos campos preenchidos', {
            description: formattedErrors,
            duration: 6000, 
          });
        } 
        else {
          toast.error(problem.title || 'Erro na requisição', {
            description: problem.detail || 'Ocorreu um problema ao processar sua solicitação.',
            duration: 4000,
          });
        }
      } else {
        toast.error('Servidor Inacessível', {
          description: 'Não conseguimos contato com a API do Valora. Verifique sua conexão ou tente mais tarde.',
          duration: 5000,
        });
      }

      return throwError(() => error);
    })
  );
};