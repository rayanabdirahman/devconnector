import express from 'express';

export interface ExtendedRequest extends express.Request {
  user?: any
}