import { Request } from 'express';
import type * as core from 'express-serve-static-core';
import type * as QueryString from 'qs';

export type TypedRequest<
  Params = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = QueryString.ParsedQs,
  TCookies = Record<string, any>,
  TAuthData = {
    access_payload?: any,
    refresh_payload?: any,
  }
> = Request<Params, ResBody, ReqBody, ReqQuery> & { 
  cookies?: TCookies, 
  auth?: TAuthData
};