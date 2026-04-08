class ApiResonse {
  response: response = {
    data: null,
    statusCode: 0,
    success: false,
    message: "success",
  };
  constructor(
    starusCode: number,
    data: any,
    message: string,
  ) {
    this.response.statusCode = starusCode;
    this.response.data = data;
    this.response.success = true;
    this.response.message = message;
  }
}

interface response {
  statusCode: number;
  data: any;
  success: boolean;
  message: string;
}

export { ApiResonse };
