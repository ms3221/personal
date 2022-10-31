import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('%cBefore...','color:blue');
    //controller에서 return한 데이터가 들어온다 미들웨더 다음에 시작되서 controller service 처리한다음 후 interceptor도 있네요
    const now = Date.now();
    return next
      .handle().pipe(
       map((data)=>({
        success: true,
        data
       }))
      );
  }
}