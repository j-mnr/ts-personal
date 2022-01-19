interface ILogger {
  info(message: string): void;
  warn(message: string): void;
  debug(message: string): void;
  error(message: string): void;
}

const developmentLogger = (): ILogger => ({
  info(message: string): void {
    console.info(message);
  },
  warn(message: string): void {
    console.warn(message);
  },
  debug(message: string): void {
    console.debug(message);
  },
  error(message: string): void {
    console.error(message);
  },
});

const productionLogger = (): ILogger => ({
  info(_: string): void {},
  warn(message: string): void {
    console.warn(message);
  },
  debug(_: string): void {},
  error(message: string): void {
    console.error(message);
  },
});

export const createLogger = (): ILogger => {
  if (process.env.NODE_ENV === "production") {
    return productionLogger();
  }
  return developmentLogger();
};
