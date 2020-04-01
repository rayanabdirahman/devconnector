import express from 'express';

interface ApiResponse {
  success(res: express.Response, data: object | string): express.Response;
  error(res: express.Response, error: object | string): express.Response;
} 

const ApiResponse: ApiResponse = {
  success: (res: express.Response, data: object | string): express.Response => {
    return res.status(200).json({
      status: 'success',
      data
    });
  },
  error: (res: express.Response, error: object | string): express.Response => {
    return res.status(400).json({
      status: 'error',
      error
    });
  }
};

export default ApiResponse;
